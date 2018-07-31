const https = require('https');

const getRequestOptions =function(username){
  return {
    hostname: 'api.github.com',
    path: `/users/${username}/repos`,
    access_token: 'XXX-XXX',
    headers: {
      'User-Agent': 'Request-Promise',
    },
  }
};

const showRepos = function (userName,reposJson) {
  console.log(`Repos Of - ${userName}`)
  reposJson.forEach((repo,index)=> {
    console.log(`* ${repo.name}`)
  })
}

let getReposOf= function(userName){
  let request = https.get(getRequestOptions(userName), (res) => {
    let responce = "";
    res.on('error',(er)=> console.error(er))
    res.on('data',(data)=> responce += data)
    res.on('end',()=> showRepos(userName,JSON.parse(responce)))
  })
}

getReposOf(process.argv[2])
