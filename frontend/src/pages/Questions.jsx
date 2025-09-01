import NavbarApp from '../components/NavbarApp';

/**
 * Questions page - Coming soon placeholder
 */
const Questions = () => {
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
              Question Bank <span className="gradient-text">Coming Soon</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Browse our comprehensive collection of AI problems.
            </p>
            <div className="glass rounded-xl p-8 max-w-2xl mx-auto">
              <p className="text-gray-300">
                This page will feature advanced problem filtering, 
                search capabilities, and curated problem collections.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Questions;
