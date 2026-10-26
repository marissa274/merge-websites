export const studies = [
    { slug: 'muse', name: 'MUSE', category: 'Beauty', tone: 'muse', description: 'Softness, with a strong point of view. A beauty website concept built around tactile photography and confident type.' },
    { slug: 'offgrid', name: 'OFFGRID', category: 'Gaming', tone: 'offgrid', description: 'A gaming concept with kinetic geometry, electric violet, and a little room to play outside the lines.' },
    { slug: 'sunday', name: 'Sunday', category: 'Food & drink', tone: 'sunday', description: 'Good food deserves good company. A warm, expressive restaurant concept with a generous editorial rhythm.' },
    { slug: 'studio-09', name: 'Studio 09', category: 'Fashion', tone: 'fashion', description: 'An independent fashion concept. Bold silhouettes, a bright palette, and an identity you can wear your own way.' }
];

studies.push(
    { slug: 'aura', name: 'AURA', category: 'Wellness', tone: 'aura', description: 'A mindful wellness studio concept. Spacious typography, a rose palette and a calm approach to booking.' },
    { slug: 'mono', name: 'MONO', category: 'Music', tone: 'mono', description: 'An independent record label concept. Electric editorial layouts, record sleeves and sound-led storytelling.' },
    { slug: 'roam', name: 'ROAM', category: 'Travel', tone: 'roam', description: 'A travel journal for curious people. Destination stories and expressive sunshine-yellow typography.' },
    { slug: 'pulse', name: 'PULSE', category: 'Fitness', tone: 'pulse', description: 'A bold training studio concept. High-contrast lime, kinetic type and a direct route to your next session.' },
    { slug: 'gallery-18', name: 'GALLERY 18', category: 'Creative', tone: 'gallery', description: 'A contemporary art gallery concept. A turquoise canvas, original graphic compositions and an exhibition-first structure.' },
    { slug: 'casa', name: 'CASA', category: 'Food & drink', tone: 'casa', description: 'A neighborhood café concept. Warm coral, thoughtful menus and an inviting place to pause.' },
);

// Cover photography of the concepts that have one; shared by concept pages and the personalization model picker.
export const conceptCovers: Record<string, string> = { muse: '/beauty.jpg', sunday: '/food.jpg', 'studio-09': '/fashion.jpg', forma: '/architecture.jpg', 'still-life': '/still-life.jpg' };
