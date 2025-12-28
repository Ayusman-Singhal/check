import React from 'react';
import './VideoList.css';

const VideoList = () => {
  const videos = [
    {
      id: 1,
      title: 'Build An Amazing Back Workout',
      channel: 'Sport Series',
      views: '16.3k views',
      duration: '13:21 (17.54%)',
      thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=120&h=80&fit=crop'
    },
    {
      id: 2,
      title: 'How to Train the Muscles at Home',
      channel: 'Sport Series',
      views: '16.3k views',
      duration: '17:34 (38.54%)',
      thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=120&h=80&fit=crop'
    }
  ];

  return (
    <div className="video-section">
      <div className="video-header">
        <h3>Your top videos in this period</h3>
        <div className="video-filter">
          <span>Popularity</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </div>
      </div>
      
      <div className="video-table">
        <div className="video-table-header">
          <span className="col-video">Video</span>
          <span className="col-views">Views</span>
          <span className="col-duration">Average view duration</span>
          <span className="col-chart"></span>
        </div>
        
        {videos.map((video) => (
          <div key={video.id} className="video-row">
            <div className="col-video">
              <div className="video-thumbnail">
                <img src={video.thumbnail} alt={video.title} />
              </div>
              <div className="video-info">
                <h4>{video.title}</h4>
                <div className="video-channel">
                  <div className="channel-avatar"></div>
                  <span>{video.channel}</span>
                </div>
              </div>
            </div>
            <div className="col-views">
              <span className="dot green"></span>
              {video.views}
            </div>
            <div className="col-duration">
              <span className="dot orange"></span>
              {video.duration}
            </div>
            <div className="col-chart">
              <svg width="60" height="24" viewBox="0 0 60 24">
                <path d="M0 18 Q15 12, 30 14 T60 10" stroke="#f4d03f" strokeWidth="2" fill="none"/>
              </svg>
              <button className="chart-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
