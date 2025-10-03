pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'yasasmi2003'
        HEROKU_APP_NAME = 'your-mindful-moments-app'
    }

    stages {
        // STAGE 1: BUILD
        stage('Build') {
            steps {
                echo '🔨 Building Docker Images...'
                script {
                    docker.build("mindful-backend:${env.BUILD_ID}", "./backend")
                    docker.build("mindful-frontend:${env.BUILD_ID}", "./frontend")
                }
            }
        }

        // STAGE 2: TEST
       stage('Test') {
    steps {
        echo '🧪 Running Tests inside Docker...'
        dir('./backend') {
            script {
                // Use npx to avoid permission issues
                sh "docker run --rm mindful-backend:${BUILD_ID} npx jest --ci --reporters=default --reporters=jest-junit"
            }
        }
    }
    post {
        always {
            // Archive JUnit test results
            junit 'backend/test-results/results.xml'
        }
    }
}


        // STAGE 3: CODE QUALITY
        stage('Code Quality') {
            steps {
                echo '📊 Running Code Quality Analysis...'
                dir('./backend') {
                    withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
                        sh """
                          npm install -g sonar-scanner
                          sonar-scanner \
                            -Dsonar.projectKey=mindful-moments-backend \
                            -Dsonar.organization=yasasmiwaranga \
                            -Dsonar.host.url=https://sonarcloud.io \
                            -Dsonar.login=$SONAR_TOKEN
                        """
                    }
                }
            }
        }

        // STAGE 4: SECURITY
        stage('Security') {
            steps {
                echo '🔒 Scanning for Security Vulnerabilities...'
                dir('./backend') {
                    sh 'npm audit --audit-level high'
                }
            }
            post {
                always {
                    echo 'Security scan completed. Check logs for details.'
                }
            }
        }

        // STAGE 5: DEPLOY TO TEST
        stage('Deploy to Test') {
            steps {
                echo '🚀 Deploying to Test Environment...'
                sh 'docker-compose -f docker-compose.test.yml up -d'
            }
        }

        // STAGE 6: RELEASE TO PRODUCTION
        stage('Release to Production') {
            steps {
                echo '🎯 Releasing to Production...'
                script {
                    // Tag and push to Docker Hub
                    sh "docker tag mindful-backend:${env.BUILD_ID} ${DOCKER_REGISTRY}/mindful-backend:latest"
                    sh "docker push ${DOCKER_REGISTRY}/mindful-backend:latest"

                    // Deploy to Heroku
                    withCredentials([string(credentialsId: 'HEROKU_API_KEY', variable: 'HEROKU_API_KEY')]) {
                        sh """
                        heroku container:login
                        docker tag mindful-backend:${BUILD_ID} registry.heroku.com/${HEROKU_APP_NAME}/web
                        docker push registry.heroku.com/${HEROKU_APP_NAME}/web
                        heroku container:release web --app ${HEROKU_APP_NAME}
                        """
                    }
                }
            }
        }

        // STAGE 7: MONITORING
        stage('Monitoring') {
            steps {
                echo '📈 Checking Production Health...'
                script {
                    try {
                        def response = httpRequest url: "https://${HEROKU_APP_NAME}.herokuapp.com/health", timeout: 30
                        if (response.status == 200) {
                            echo "✅ Production health check PASSED - Status: ${response.status}"
                        } else {
                            error "❌ Production health check FAILED - Status: ${response.status}"
                        }
                    } catch (Exception e) {
                        error "❌ Production health check FAILED - Exception: ${e.getMessage()}"
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
            cleanWs()
        }
        success {
            echo '✅ Pipeline succeeded!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
