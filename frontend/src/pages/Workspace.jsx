import NavbarApp from '../components/NavbarApp';

/**
 * Workspace page - Coming soon placeholder
 */
const Workspace = () => {
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
              Coding Workspace <span className="gradient-text">Coming Soon</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Advanced IDE-like workspace for complex AI projects.
            </p>
            <div className="glass rounded-xl p-8 max-w-2xl mx-auto">
              <p className="text-gray-300">
                This page will feature a full-featured development environment
                with multiple files, debugging capabilities, and collaborative features.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Workspace;
