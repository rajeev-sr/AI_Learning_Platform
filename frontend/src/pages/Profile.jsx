import NavbarApp from '../components/NavbarApp';

/**
 * Profile page - Coming soon placeholder
 */
const Profile = () => {
  const mockUser = {
    name: 'Alex Chen',
    score: 1847,
    level: 'Advanced',
    streak: 12
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-dark-300 to-black">
      <NavbarApp user={mockUser} />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              User Profile <span className="gradient-text">Coming Soon</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Manage your account settings and view detailed progress.
            </p>
            <div className="glass rounded-xl p-8 max-w-2xl mx-auto">
              <p className="text-gray-300">
                This page will feature user settings, achievement tracking,
                learning path customization, and social features.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
