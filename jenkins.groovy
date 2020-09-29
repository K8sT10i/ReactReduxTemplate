// 次のように `load` で読み込んで使う
// def builder = load 'jenkins.groovy'
// builder.build()

def build() {
    sh 'rm -rf ./dist/prod'
    sh 'yarn build --no-cache'
    sh 'tar -cz -f ./dist/ceportal-web.tar.gz -C ./dist/prod .'
}

def copyDistTo(filepath) {
    sh "sudo mkdir -p \$(dirname ${filepath})"
    sh "sudo cp -pr ./dist/ceportal-web.tar.gz ${filepath}"
}

return this
