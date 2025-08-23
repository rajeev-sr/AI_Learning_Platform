import { useState } from 'react';

export default function Profile({ user }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: 'Rajeev Kumar',
    email: 'rajeev@example.com',
    title: 'AI/ML Student',
    location: 'New Delhi, India',
    bio: 'Passionate about artificial intelligence and machine learning. Currently learning deep learning concepts and working on real-world projects.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NumPy', 'Scikit-learn', 'Pandas'],
    github: 'rajeev-sr',
    linkedin: 'rajeev-kumar-ai',
    website: 'rajeevkumar.dev'
  });

  const stats = {
    questionsCompleted: 23,
    totalPoints: 2450,
    rank: 342,
    accuracy: 78,
    streak: 7,
    joinedDate: 'March 2024'
  };

  const badges = [
    { name: 'Early Adopter', description: 'Joined in the first month', color: 'bg-purple-500', earned: true },
    { name: 'ML Expert', description: 'Completed 20+ ML questions', color: 'bg-green-500', earned: true },
    { name: 'Code Quality', description: 'High code quality average', color: 'bg-blue-500', earned: true },
    { name: 'Speed Demon', description: 'Fast problem solver', color: 'bg-red-500', earned: false },
    { name: 'Perfect Score', description: 'Got 100% on 5+ questions', color: 'bg-yellow-500', earned: false }
  ];

  const recentSubmissions = [
    { id: 1, question: 'Linear Regression Implementation', score: 92, date: '2024-01-15', category: 'ML' },
    { id: 2, question: 'Neural Network from Scratch', score: 85, date: '2024-01-12', category: 'AI' },
    { id: 3, question: 'Decision Tree Algorithm', score: 78, date: '2024-01-10', category: 'ML' },
    { id: 4, question: 'K-Means Clustering', score: 89, date: '2024-01-08', category: 'ML' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    //save to backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-6 text-center">
              {/* Profile Picture */}
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-center font-semibold"
                  />
                  <input
                    type="text"
                    value={profileData.title}
                    onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-center text-slate-600"
                  />
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-center text-slate-500"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-slate-900 mb-1">{profileData.name}</h2>
                  <p className="text-slate-600 mb-1">{profileData.title}</p>
                  <p className="text-slate-500 text-sm">{profileData.location}</p>
                </>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.questionsCompleted}</div>
                  <div className="text-xs text-slate-500">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.totalPoints}</div>
                  <div className="text-xs text-slate-500">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">#{stats.rank}</div>
                  <div className="text-xs text-slate-500">Rank</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{stats.accuracy}%</div>
                  <div className="text-xs text-slate-500">Accuracy</div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3 mt-6 pt-6 border-t border-slate-200">
                <a href="#" className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-white hover:bg-slate-800 transition">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 bg-slate-500 rounded-lg flex items-center justify-center text-white hover:bg-slate-600 transition">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.346-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 mb-8">
              <div className="border-b border-slate-200">
                <div className="flex">
                  {['overview', 'activity', 'badges', 'settings'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 font-medium text-sm capitalize border-b-2 transition ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600 bg-blue-50'
                          : 'border-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Bio */}
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">About</h3>
                      {isEditing ? (
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          className="w-full p-3 border border-slate-300 rounded-lg resize-none h-24"
                        />
                      ) : (
                        <p className="text-slate-700 leading-relaxed">{profileData.bio}</p>
                      )}
                    </div>

                    {/* Skills */}
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Recent Activity Chart */}
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-4">Learning Progress</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-50 rounded-lg p-4">
                          <h4 className="font-medium text-slate-700 mb-3">Category Breakdown</h4>
                          {[
                            { name: 'Machine Learning', percentage: 65, color: 'bg-green-500' },
                            { name: 'Artificial Intelligence', percentage: 45, color: 'bg-purple-500' },
                            { name: 'Deep Learning', percentage: 30, color: 'bg-blue-500' },
                            { name: 'Generative AI', percentage: 25, color: 'bg-yellow-500' }
                          ].map((category) => (
                            <div key={category.name} className="mb-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span>{category.name}</span>
                                <span>{category.percentage}%</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${category.color}`}
                                  style={{ width: `${category.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4">
                          <h4 className="font-medium text-slate-700 mb-3">Recent Scores</h4>
                          <div className="space-y-2">
                            {recentSubmissions.slice(0, 4).map((submission) => (
                              <div key={submission.id} className="flex justify-between items-center">
                                <span className="text-sm text-slate-600 truncate flex-1">
                                  {submission.question}
                                </span>
                                <span className={`text-sm font-medium ml-2 ${
                                  submission.score >= 80 ? 'text-green-600' :
                                  submission.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                  {submission.score}%
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 text-slate-600 hover:text-slate-900 transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-4">Recent Submissions</h3>
                    <div className="space-y-4">
                      {recentSubmissions.map((submission) => (
                        <div key={submission.id} className="bg-slate-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-slate-900">{submission.question}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="px-2 py-1 bg-slate-200 rounded text-xs font-medium">
                                  {submission.category}
                                </span>
                                <span className="text-sm text-slate-500">{submission.date}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-xl font-bold ${
                                submission.score >= 80 ? 'text-green-600' :
                                submission.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {submission.score}%
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'badges' && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-4">Achievements & Badges</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {badges.map((badge) => (
                        <div 
                          key={badge.name}
                          className={`p-4 rounded-lg border-2 ${
                            badge.earned 
                              ? 'border-green-200 bg-green-50' 
                              : 'border-slate-200 bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full ${badge.color} flex items-center justify-center text-white font-bold ${
                              !badge.earned ? 'grayscale opacity-50' : ''
                            }`}>
                              {badge.name[0]}
                            </div>
                            <div className="flex-1">
                              <h4 className={`font-medium ${
                                badge.earned ? 'text-green-900' : 'text-slate-700'
                              }`}>
                                {badge.name}
                              </h4>
                              <p className={`text-sm ${
                                badge.earned ? 'text-green-700' : 'text-slate-500'
                              }`}>
                                {badge.description}
                              </p>
                            </div>
                            {badge.earned && (
                              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-600">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                              </svg>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-4">Account Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                          <input
                            type="email"
                            value={profileData.email}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">GitHub Username</label>
                          <input
                            type="text"
                            value={profileData.github}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn Profile</label>
                          <input
                            type="text"
                            value={profileData.linkedin}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 mb-4">Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-700">Email Notifications</p>
                            <p className="text-sm text-slate-500">Receive notifications about new questions and updates</p>
                          </div>
                          <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                            <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-slate-700">Public Profile</p>
                            <p className="text-sm text-slate-500">Allow others to see your progress and achievements</p>
                          </div>
                          <button className="w-12 h-6 bg-slate-300 rounded-full relative">
                            <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                        Save Settings
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
