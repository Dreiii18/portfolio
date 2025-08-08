# My Portfolio Website 🚀

Hey there! This is my personal portfolio website where I showcase my projects and share a bit about myself. I built this from scratch during my final year at Langara College, and honestly, I'm pretty proud of how it turned out.

## What I Used

I went with Next.js 14 for this project because, well, it's 2024 and who doesn't love some good SSR? Plus TypeScript because debugging JavaScript at 2 AM isn't fun (learned that the hard way). Here's the full stack:

- **Next.js 14** - The React framework that actually makes sense
- **TypeScript** - Because I got tired of "undefined is not a function" errors
- **Tailwind CSS** - Makes me feel like a design wizard without actually being one
- **Framer Motion** - For those buttery smooth animations that make everything feel alive

## What You'll Find Here

### The Sections
- **Hero** - First impressions matter, right? 
- **About** - My story as a fresh grad trying to make it in tech
- **Projects** - The stuff I'm actually proud of (and some I learned from the hard way)
- **Experience** - My journey from student to... well, still figuring it out
- **Skills** - The tech stack I actually know (not just what's on every job posting)
- **Contact** - Hit me up if you want to chat about code, coffee, or both

### The Cool Stuff
- Mobile-first design (because let's be real, everyone's on their phone)
- Smooth animations that don't make your laptop sound like a jet engine
- Actually decent performance scores (I checked, multiple times)

## Getting Started

Want to run this locally? Here's how:

```bash
# Grab the code
git clone https://github.com/andreiartap/portfolio.git
cd portfolio

# Install the usual suspects
npm install

# Fire it up
npm run dev
```

Then head to `localhost:3000` and you should be good to go!

### Other Commands
```bash
npm run build     # Production build (the scary one)
npm start         # Serve the production build
npm run lint      # Keep the code clean
npm run type-check # TypeScript police
```

## How It's Organized

```
├── app/                    # Next.js App Router stuff
├── components/             # All the React bits
│   ├── sections/          # Main page sections
│   ├── animations/        # Framer Motion components
│   └── ui/               # Reusable components
├── lib/                   # The boring but important stuff
│   ├── data/             # All my content lives here
│   └── utils/            # Helper functions
└── public/               # Images and static files
```

## Customizing This Thing

### Adding Projects
Just update `lib/data/projects.ts` with your project details. Drop your images in `public/images/` and they'll show up automatically.

### Skills & Experience  
Same deal - edit the files in `lib/data/` and everything updates. I tried to make it as painless as possible.

### Colors & Styling
The design system lives in `tailwind.config.js` and `app/globals.css`. Change whatever you want - it's pretty flexible.

## Performance Stuff

I actually care about page speed (probably more than I should), so this site:
- Loads fast even on slower connections
- Has decent Lighthouse scores
- Uses optimized images
- Doesn't kill your phone's battery

## Deploy It

I'm using Vercel because it's honestly just easy mode for Next.js:
1. Push your code to GitHub
2. Connect it to Vercel
3. That's it, you're deployed

No config files, no headaches, no staying up until 3 AM debugging deployment issues.

## Accessibility

I tried my best to make this accessible for everyone:
- Works with screen readers
- Full keyboard navigation
- Good color contrast
- Respects reduced motion preferences

## A Quick Note

This is my first "real" portfolio site, so if you spot something that could be better, I'm all ears! I'm still learning and always looking to improve.

## Get in Touch

If you want to connect or just say hi:
- **Email**: andreiartap@gmail.com
- **Phone**: 236-994-1803  
- **LinkedIn**: [andrei-artap](https://www.linkedin.com/in/andrei-artap/)
- **GitHub**: [Dreiii18](https://github.com/Dreiii18)

## Credits

Shoutout to the amazing tools and frameworks that made this possible:
- Next.js team for making React development actually enjoyable
- Tailwind CSS for making me feel like I can design
- Framer Motion for the smooth animations
- Vercel for the zero-config deployments

---

Built with lots of coffee and determination by Andrei Artap ☕