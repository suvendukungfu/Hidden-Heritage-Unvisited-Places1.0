export default function Footer() {
  return (
    <footer className="bg-[#3b2a1a] text-white px-10 py-12 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        
        <div>
          <h2 className="font-semibold mb-2">Hidden Heritage</h2>
          <p>
            Discover India’s forgotten treasures and experience untold stories.
          </p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Quick Links</h2>
          <p>Home</p>
          <p>Explore</p>
          <p>Trip Builder</p>
          <p>About</p>
          <p>Feedback</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Contact</h2>
          <p>Email: info@hiddenheritage.in</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Chambal Region, MP</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Follow Us</h2>
          <p>Instagram</p>
          <p>Twitter</p>
          <p>Facebook</p>
        </div>
      </div>

      <p className="text-center text-xs mt-8">
        © 2025 Hidden Heritage. All rights reserved.
      </p>
    </footer>
  );
}

