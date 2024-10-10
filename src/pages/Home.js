// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TweetCard from '../components/TweetCard';
import PostTweet from '../components/PostTweet';

function Home() {
  const [tweets, setTweets] = useState([]);
  const tweetServiceURL = process.env.REACT_APP_TWEET_SERVICE_URL;

  useEffect(() => {
    // Fetch tweets from the backend
    const fetchTweets = async () => {
      try {
        const response = await axios.get(`${tweetServiceURL}/api/tweets`);
        setTweets(response.data);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchTweets();
  }, []);

  // Function to add a new tweet to the state
  const addNewTweet = (newTweet) => {
    setTweets([newTweet, ...tweets]); // Add the new tweet to the beginning of the list
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10 col-lg-11">
          <PostTweet onTweetPosted={addNewTweet} />
          <div className="mt-4">
            {tweets.map((tweet, index) => (
              <TweetCard key={index} tweet={tweet} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
