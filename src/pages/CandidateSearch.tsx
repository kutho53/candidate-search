import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchCandidates = async () => {
      try{
        const data = await searchGithub(); //this may need to be adjusted for the API
        setCandidates(data);
        setLoading (false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const saveCandidate = () => {
    //need to add logic to save candidates to local storage
  };

  const nextCandidate = () => {
    if (currentCandidateIndex < candidates.length-1) {
      setCurrentCandidateIndex(currentCandidateIndex -1);
    }
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;
  if(candidates.length === 0) return <h1>No candidates available</h1>

  const candidate = candidates[currentCandidateIndex];
  

  return (
    <div>
      <h1>CandidateSearch</h1>;
      <div>
        <h2>{candidate.name}</h2>
        <p>Username: {candidate.username}</p>
        <p>Location: {candidate.location}</p>
        <img src={candidate.avatar} alt={candidate.name} />
        <button onClick={saveCandidate}>+</button>
      </div>
      <button onClick={nextCandidate}>Next Candidate</button>
    </div>
  );
};

export default CandidateSearch;
