import { useState } from 'react';
import Navbar from '../components/Navbar';

const statsData = {
  totalQuestions: 48,
  completed: 12,
  inProgress: 3,
  accuracy: 78,
  totalTime: 240, // minutes
  streak: 7
};

const recentActivity = [
  { id: 1, type: 'completed', question: 'Linear Regression from Scratch', category: 'ML', time: '2 hours ago', score: 85 },
  { id: 2, type: 'started', question: 'CNN for Image Classification', category: 'DL', time: '1 day ago', score: null },
  { id: 3, type: 'completed', question: 'Decision Tree Implementation', category: 'ML', time: '2 days ago', score: 92 },
  { id: 4, type: 'completed', question: 'Search Algorithm Optimization', category: 'AI', time: '3 days ago', score: 76 }
];

const achievements = [
  { id: 1, title: 'First Steps', description: 'Complete your first question', icon: '🏆', unlocked: true },
  { id: 2, title: 'ML Enthusiast', description: 'Complete 5 ML questions', icon: '🏆', unlocked: true },
  { id: 3, title: 'Speed Coder', description: 'Complete a question in under 30 minutes', icon: '⚡', unlocked: false },
  { id: 4, title: 'Perfect Score', description: 'Get 100% on any question', icon: '🏆', unlocked: false }
];

export default function Dashboard({ user }) {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const StatCard = ({ title, value, change, icon, color }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {change && (
            <p className={`text-sm ${change.positive ? 'text-green-600' : 'text-red-600'} mt-1`}>
              {change.positive ? '↗' : '↘'} {change.value}% from last {selectedPeriod}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-white text-xl`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-slate-600 mt-1">Track your learning progress and achievements</p>
            </div>
            
            <div className="flex items-center gap-4">
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                title="Questions Completed"
                value={statsData.completed}
                change={{ positive: true, value: 15 }}
                icon="✅"
                color="bg-green-500"
              />
              <StatCard
                title="Accuracy Rate"
                value={`${statsData.accuracy}%`}
                change={{ positive: true, value: 8 }}
                icon="🎯"
                color="bg-blue-500"
              />
              <StatCard
                title="Learning Streak"
                value={`${statsData.streak} days`}
                change={{ positive: true, value: 12 }}
                icon="🔥"
                color="bg-orange-500"
              />
            </div>

            {/* Progress Charts */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Learning Progress</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Category Progress */}
                <div>
                  <h3 className="font-medium text-slate-700 mb-4">Progress by Category</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'AI', completed: 3, total: 12, color: 'bg-purple-500' },
                      { name: 'ML', completed: 5, total: 15, color: 'bg-green-500' },
                      { name: 'DL', completed: 2, total: 10, color: 'bg-blue-500' },
                      { name: 'GenAI', completed: 2, total: 11, color: 'bg-yellow-500' }
                    ].map((category) => (
                      <div key={category.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-slate-700">{category.name}</span>
                          <span className="text-slate-500">{category.completed}/{category.total}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${category.color}`}
                            style={{ width: `${(category.completed / category.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Activity */}
                <div>
                  <h3 className="font-medium text-slate-700 mb-4">Weekly Activity</h3>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xs text-slate-500 mb-1">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}
                        </div>
                        <div 
                          className={`h-8 rounded ${
                            Math.random() > 0.3 ? 'bg-green-500' : 'bg-slate-200'
                          }`}
                          title={`${Math.floor(Math.random() * 3)} questions`}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        activity.type === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-slate-900">{activity.question}</p>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="px-2 py-1 bg-slate-200 rounded text-xs font-medium">
                            {activity.category}
                          </span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    {activity.score && (
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          activity.score >= 80 ? 'text-green-600' : 
                          activity.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {activity.score}%
                        </div>
                        <div className="text-xs text-slate-500">Score</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                  Continue Learning
                </button>
                <button className="w-full px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition">
                  Practice Random
                </button>
                <button className="w-full px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition">
                  Review Mistakes
                </button>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`p-3 rounded-lg border-2 ${
                      achievement.unlocked 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-2xl ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </span>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          achievement.unlocked ? 'text-green-900' : 'text-slate-700'
                        }`}>
                          {achievement.title}
                        </p>
                        <p className={`text-xs ${
                          achievement.unlocked ? 'text-green-700' : 'text-slate-500'
                        }`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Recommendations */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Recommendations</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-900 text-sm">Focus on Deep Learning</p>
                  <p className="text-blue-700 text-xs">You're behind in DL questions</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium text-green-900 text-sm">Great ML Progress!</p>
                  <p className="text-green-700 text-xs">Keep up the momentum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
