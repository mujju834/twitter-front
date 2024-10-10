import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TweetCard from '../components/TweetCard';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const userId = '60d21b4667d0d8992e610c85'; // Replace with the actual logged-in user ID

  // Use environment variables for URLs
  const baseURL = process.env.REACT_APP_BASE_URL;
  const tweetServiceURL = process.env.REACT_APP_TWEET_SERVICE_URL;

    // Debug: Log the environment variables
    // console.log('Base URL:', baseURL);
    // console.log('Tweet Service URL:', tweetServiceURL);

  useEffect(() => {
    // Fetch profile and user's tweets
    const fetchProfileAndTweets = async () => {
      try {
        const profileResponse = await axios.get(`${baseURL}/api/profiles/${userId}`);
        
        setProfile(profileResponse.data);
        setFormData(profileResponse.data); // Initialize form data with fetched profile

        const tweetResponse = await axios.get(`${tweetServiceURL}/api/tweets?userId=${userId}`);
        setTweets(tweetResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProfileAndTweets();
  }, [baseURL, tweetServiceURL]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });

      // Show a preview of the uploaded image
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = async () => {
    try {
      // Create a form data object for the profile update
      const updateData = new FormData();
      updateData.append('name', formData.name || '');
      updateData.append('handle', formData.handle || '');
      updateData.append('bio', formData.bio || '');
      updateData.append('location', formData.location || '');
      updateData.append('website', formData.website || '');
      if (formData.profilePicture) {
        updateData.append('profilePicture', formData.profilePicture);
      }

      // Update profile using the profile-service API
      const response = await axios.put(`${baseURL}/api/profiles/${userId}`, updateData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setProfile(response.data); // Update profile with the new data
      setIsEditing(false); // Exit edit mode
      setProfilePicturePreview(null); // Reset the profile picture preview
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-section container mt-4">
      <div className="profile-header mb-4">
        {/* Profile picture and basic details */}
        <div className="d-flex align-items-center mt-3">
          <img
            src={
              profilePicturePreview ||
              (profile?.profilePictureUrl ? `${baseURL}${profile.profilePictureUrl}` : 'https://example.com/default-profile.jpg')
            }
            alt="User Profile"
            className="rounded-circle me-3"
            width="100"
            height="100"
          />
          <div>
            {isEditing ? (
              <>
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="form-control"
                  aria-label="Name"
                />
                <label htmlFor="profilePicture" className="form-label mt-2">Profile Picture</label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  onChange={handleProfilePictureChange}
                  className="form-control"
                  aria-label="Profile Picture"
                />
              </>
            ) : (
              <h4>{profile?.name} <span className="badge bg-primary">Get verified</span></h4>
            )}
            <p className="text-muted">@{profile?.handle}</p>
            {isEditing ? (
              <button onClick={handleSaveClick} className="btn btn-success mt-2">Save</button>
            ) : (
              <button onClick={handleEditClick} className="btn btn-primary mt-2">Edit Profile</button>
            )}
          </div>
        </div>

        {/* Bio and other details */}
        <div className="mt-3">
          {isEditing ? (
            <>
              <label htmlFor="bio" className="form-label">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio || ''}
                onChange={handleInputChange}
                className="form-control"
                aria-label="Bio"
              />
            </>
          ) : (
            <p>{profile?.bio}</p>
          )}
        </div>

        <div className="mt-3">
          {isEditing ? (
            <>
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location || ''}
                onChange={handleInputChange}
                className="form-control mb-2"
                aria-label="Location"
              />
              <label htmlFor="website" className="form-label">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website || ''}
                onChange={handleInputChange}
                className="form-control"
                aria-label="Website"
              />
            </>
          ) : (
            <p className="text-muted">
              <i className="bi bi-geo-alt"></i> {profile?.location} &nbsp;|&nbsp;
              <a href={profile?.website} target="_blank" rel="noopener noreferrer">{profile?.website}</a>
            </p>
          )}
        </div>
      </div>

      <div className="profile-tweets">
        {tweets.length === 0 ? (
          <p>No tweets to show.</p>
        ) : (
          tweets.map((tweet, index) => <TweetCard key={index} tweet={tweet} />)
        )}
      </div>
    </div>
  );
}

export default Profile;
