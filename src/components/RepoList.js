import React, {useEffect, useState} from 'react'
import axios from 'axios';

const getRepositories = (username) => {
  const endpoint = `https://api.github.com/users/${username}/repos`;
  return new Promise((resolve, reject) => {
    axios.get(endpoint)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
  });
};

// global counters
var licensed = 0;
var total = 0;


// function to determine if repo has a license
function includeRepo(repo){
  const license = repo['license'];
  if (!license) {
    total++;
    return true
  } else {
    licensed++;
    total++;
    return false
  }
}

const filterRepos = repos => {
  return repos.filter(includeRepo);
}


const RepoList = props => {

  // repositories
  const [repositories, setRepositories] = useState(null);
  const localUsername = props.username;

  const grades = ["C-", "C", "B-", "B", "A-", "A", "A+", "A++"];
  // set grades
  const percentage_licensed = Math.round((licensed / total) * 100).toFixed(2);
  const grade_index = Number(Math.round((percentage_licensed / 100)* grades.length).toFixed(2));
  const grade = grades[grade_index];


  useEffect(() => {
    getRepositories(localUsername)
      .then(res => {
        const new_repos = filterRepos(res);
        setRepositories(new_repos);
      })
      .catch(err => {
        console.log(err)
      })

  }, [localUsername]);

  return (
    <div className='p-3 m-3 mx-auto my-auto text-center w-100'>

      <div className='flex flex-col p-3 m-3 mx-auto text-center sm:flex-row md:flex-row lg:flex-row scorecard '>

          <div className='flex flex-col flex-1 scorecard-percentage'>
            <p className='text-6xl'> {percentage_licensed || "..." }% </p>
            <p className='text-xl'> of your repositories have a license</p>
          </div>

          <div className='flex flex-col flex-1 scorecard-grade'>
            <p className='text-6xl'> {grade} </p>
            <p className='text-xl'> Grade </p>
          </div>

        </div>

      {repositories && 
        <ul>
          {repositories.map(repo => (
            <li 
              key={repo.id}
              className='flex flex-col p-3 m-3 rounded shadow-md sm:flex-row md:flex-row lg:flex-row'
            > 
              <span className='flex-1 w-full p-3 text-md'>{repo.full_name}</span>
              <span className='flex-1 w-full p-3 text-white bg-blue-500 rounded text-md'><a href={repo.html_url}> Take me there  </a></span>
               
            </li>
          ))}
        </ul>
      }

    </div>
  )

}

export default RepoList
