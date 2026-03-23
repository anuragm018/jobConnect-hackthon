require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Project = require('./models/Project');
const ForumPost = require('./models/ForumPost');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://jobconnect:Mf7q1rNm7ljSi0e5@cluster0.ba8st2b.mongodb.net/jobconnect?retryWrites=true&w=majority';

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing development data
    await User.deleteMany({});
    await Project.deleteMany({});
    await ForumPost.deleteMany({});
    console.log('Cleared existing data.');

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    // 1 Customer
    const customer = new User({
      name: 'Anjali Nair',
      email: 'customer@example.com',
      password,
      role: 'customer',
      phone: '+91 9876543210',
      location: 'Kochi, Kerala',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200'
    });

    // 4 Workers
    const worker1 = new User({
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      password,
      role: 'worker',
      phone: '+91 8888888881',
      location: 'Edappally, Kochi',
      skills: ['Plumber'],
      title: 'Senior Plumber & Pipeline Specialist',
      hourlyRate: 450,
      isAvailable: true,
      successRate: 98,
      reviewsCount: 124,
      avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&h=400'
    });

    const worker2 = new User({
      name: 'Marcus Chen',
      email: 'marcus@example.com',
      password,
      role: 'worker',
      phone: '+91 8888888882',
      location: 'Marine Drive, Kochi',
      skills: ['Electrician'],
      title: 'Master Electrician',
      hourlyRate: 600,
      isAvailable: true,
      successRate: 95,
      reviewsCount: 89,
      avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&q=80&w=100&h=100'
    });

    const worker3 = new User({
      name: 'Elena Rodriguez',
      email: 'elena@example.com',
      password,
      role: 'worker',
      phone: '+91 8888888883',
      location: 'Kakkanad, Kochi',
      skills: ['Interior Design', 'Painter'],
      title: 'Interior Painting Specialist',
      hourlyRate: 400,
      isAvailable: false,
      successRate: 94,
      reviewsCount: 56,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100'
    });
    
    const worker4 = new User({
      name: 'Sanjeev Menon',
      email: 'sanjeev@example.com',
      password,
      role: 'worker',
      phone: '+91 8888888884',
      location: 'Panampilly Nagar, Kochi',
      skills: ['Carpenter'],
      title: 'Expert Carpenter & Woodworker',
      hourlyRate: 550,
      isAvailable: true,
      successRate: 100,
      reviewsCount: 42,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&h=100'
    });

    await customer.save();
    await worker1.save();
    await worker2.save();
    await worker3.save();
    await worker4.save();
    console.log('Inserted Users successfully.');

    // Projects
    const p1 = new Project({
      workerId: worker1._id,
      title: 'Modern Bathroom Renovation',
      subtitle: 'Complete pipeline overhaul',
      category: 'Plumbing',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&h=800',
      overview: 'Completely replaced the rust-clogged main valves and installed a premium modern shower system perfectly sealed behind new tiling.',
      metrics: { duration: '4 Days', scale: 'Full Reno', area: '120 sq.ft', budget: '₹45,000' },
      materials: ['Copper Pipes', 'Brass Valves', 'Ceramic Sealant']
    });

    const p2 = new Project({
      workerId: worker2._id,
      title: 'Smart Home Wiring',
      subtitle: 'IoT integrated mainboard',
      category: 'Electrical',
      imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=800&h=800',
      overview: 'Wired a 3BHK flat and integrated WiFi smart switches directly into the main hub. Completely transformed the apartment into an automated ecosystem.',
      metrics: { duration: '1 Week', scale: 'Apartment', area: '1500 sq.ft', budget: '₹1.2L' },
      materials: ['Fireproof Cables', 'Smart Relays']
    });

    const p3 = new Project({
      workerId: worker3._id,
      title: 'Living Room Makeover',
      subtitle: 'Textured walls',
      category: 'Interior Design',
      imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&h=800',
      overview: 'Applied a custom stucco texture and premium matte finish to completely alter the lighting depth of the living room.',
      metrics: { duration: '3 Days', scale: 'Single Room', area: '400 sq.ft', budget: '₹22,000' },
      materials: ['Matte Paint', 'Stucco Putty']
    });

    const p4 = new Project({
      workerId: worker4._id,
      title: 'Custom Teak Bookshelf',
      subtitle: 'Hand-crafted solid wood',
      category: 'Carpentry',
      imageUrl: 'https://images.unsplash.com/photo-1594833256087-43f1bba4fa78?auto=format&fit=crop&w=800&h=800',
      overview: 'Designed and built a floor-to-ceiling solid teak bookshelf with hidden compartments and brass fittings.',
      metrics: { duration: '14 Days', scale: 'Furniture', area: 'N/A', budget: '₹65,000' },
      materials: ['Solid Teak Wood', 'Brass Hinges', 'Premium Varnish']
    });

    await p1.save();
    await p2.save();
    await p3.save();
    await p4.save();
    console.log('Inserted Projects successfully.');

    // Give some workers reputation for the Gamification Demo
    worker1.reputationScore = 15; // Top Expert
    await worker1.save();
    
    worker4.reputationScore = 6; // Rising Pro
    await worker4.save();

    // Forum Posts
    const fp1 = new ForumPost({
      authorId: customer._id,
      title: 'Water leaking from upstairs ceiling',
      content: 'I noticed a steady drip coming through the drywall in my kitchen ceiling right below the upstairs bathroom. Does anyone know if this is an emergency or can wait?',
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      comments: [
        {
          authorId: worker1._id, // Rajesh the Plumber
          content: 'That sounds like a compromised waste pipe from the bathroom above. You should shut off the main valve and have it looked at immediately before the drywall collapses.',
          createdAt: new Date(Date.now() - 40000000)
        }
      ]
    });

    const fp2 = new ForumPost({
      authorId: worker3._id, // Elena (Painter)
      title: 'Best primer for exterior walls in high humidity?',
      content: 'I have a project in Fort Kochi right by the water. Standard acrylic primers tend to fail after a year here. Any recommendations from other painters on the best anti-fungal primer?',
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
      comments: [
        {
          authorId: worker4._id, // Sanjeev
          content: 'Not a painter, but when we build exterior pergolas there we use an epoxy-based wood primer. For masonry, look into silane-siloxane sealers before priming.',
          createdAt: new Date(Date.now() - 100000000)
        }
      ]
    });

    await fp1.save();
    await fp2.save();
    console.log('Inserted Community Help Threads successfully.');

    console.log('\\n--- SEEDING COMPLETE ---');
    console.log('Test Accounts added! Password for all is: password123');
    console.log('Customer: customer@example.com');
    console.log('Workers : rajesh@example.com, marcus@example.com, elena@example.com, sanjeev@example.com');
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
