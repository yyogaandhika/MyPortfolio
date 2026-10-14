import { NextResponse } from 'next/server';
import { GitHubRepo } from '@/types';

const repoMetadata: Record<string, { description: string; language?: string; homepage?: string }> = {
  'web-kominfo': {
    description: 'Sistem Informasi Terpadu Analitik dan Hasil Data Sektoral Kominfo Kota Dumai.',
    language: 'React & Vite',
    homepage: 'https://web-kominfo-seven.vercel.app/',
  },
  'edusummarize-website-peringkas-pelajaran-saints': {
    description: 'Platform edukasi berbasis AI untuk merangkum pelajaran sains otomatis dengan UI modern.',
    language: 'Next.js & AI',
    homepage: 'https://edu-summarize-website-peringkas-pel.vercel.app',
  },
  'product_ml_api': {
    description: 'Machine Learning REST API untuk analisis & klasifikasi produk terintegrasi web dashboard.',
    language: 'Python & React',
    homepage: 'https://product-ml-api.vercel.app',
  },
  'website-prediksi-next-kategori-item-purchase': {
    description: 'Model machine learning predictive analytics untuk klasifikasi kategori pembelian item belanja.',
    language: 'Python (ML)',
    homepage: 'https://website-prediksi-next-kategori-item.vercel.app/',
  },
  'website-barang-kedai': {
    description: 'Aplikasi Point of Sale (POS) & inventaris manajemen toko berbasis React modern.',
    language: 'React & JS',
    homepage: 'https://website-barang-kedai.vercel.app',
  },
  'myportfolio': {
    description: 'Personal creative portfolio dibangun dengan Next.js, TypeScript, Tailwind, dan animasi GSAP.',
    language: 'TypeScript & Next.js',
    homepage: 'https://my-portfolio-gamma-five-58.vercel.app',
  },
  'besitua': {
    description: 'Web portal dan katalog manajemen pengelolaan material besi bekas / daur ulang barang.',
    language: 'PHP & Blade',
  },
};

const defaultRepos: GitHubRepo[] = [
  {
    id: 99901,
    name: 'Web-Kominfo',
    description: 'Sistem Informasi Terpadu Analitik dan Hasil Data Sektoral Kominfo Kota Dumai.',
    html_url: 'https://github.com/yyogaandhika/Web-Kominfo.git',
    homepage: 'https://web-kominfo-seven.vercel.app/',
    stargazers_count: 1,
    language: 'React & Vite',
    created_at: '2026-10-02T10:00:00Z',
    updated_at: '2026-10-14T09:00:00Z',
  },
  {
    id: 1293845245,
    name: 'EduSummarize-Website-Peringkas-Pelajaran-Saints',
    description: 'Platform edukasi berbasis AI untuk merangkum pelajaran sains otomatis dengan UI modern.',
    html_url: 'https://github.com/yyogaandhika/EduSummarize-Website-Peringkas-Pelajaran-Saints',
    homepage: 'https://edu-summarize-website-peringkas-pel.vercel.app',
    stargazers_count: 1,
    language: 'Next.js & AI',
    created_at: '2026-07-08T16:12:21Z',
    updated_at: '2026-08-24T06:57:04Z',
  },
  {
    id: 1116857981,
    name: 'product_ml_api',
    description: 'Machine Learning REST API untuk analisis & klasifikasi produk terintegrasi web dashboard.',
    html_url: 'https://github.com/yyogaandhika/product_ml_api',
    homepage: 'https://product-ml-api.vercel.app',
    stargazers_count: 1,
    language: 'Python & React',
    created_at: '2025-12-15T13:34:20Z',
    updated_at: '2026-08-24T06:57:00Z',
  },
  {
    id: 1272393673,
    name: 'Website-Prediksi-Next-Kategori-Item-Purchase',
    description: 'Model machine learning predictive analytics untuk klasifikasi kategori pembelian item belanja.',
    html_url: 'https://github.com/yyogaandhika/Website-Prediksi-Next-Kategori-Item-Purchase',
    homepage: 'https://website-prediksi-next-kategori-item.vercel.app/',
    stargazers_count: 1,
    language: 'Python (ML)',
    created_at: '2026-06-17T15:08:17Z',
    updated_at: '2026-08-24T06:57:01Z',
  },
  {
    id: 1333746287,
    name: 'Website-Barang-Kedai',
    description: 'Aplikasi Point of Sale (POS) & inventaris manajemen toko berbasis React modern.',
    html_url: 'https://github.com/yyogaandhika/Website-Barang-Kedai',
    homepage: 'https://website-barang-kedai.vercel.app',
    stargazers_count: 1,
    language: 'React & JS',
    created_at: '2026-08-14T03:20:17Z',
    updated_at: '2026-08-24T06:57:08Z',
  },
  {
    id: 1296062237,
    name: 'MyPortfolio',
    description: 'Personal creative portfolio dibangun dengan Next.js, TypeScript, Tailwind, dan animasi GSAP.',
    html_url: 'https://github.com/yyogaandhika/MyPortfolio',
    homepage: 'https://my-portfolio-gamma-five-58.vercel.app',
    stargazers_count: 1,
    language: 'TypeScript & Next.js',
    created_at: '2026-07-10T04:51:30Z',
    updated_at: '2026-08-24T06:57:05Z',
  },
  {
    id: 947929128,
    name: 'BesiTua',
    description: 'Web portal dan katalog manajemen pengelolaan material besi bekas / daur ulang barang.',
    html_url: 'https://github.com/yyogaandhika/BesiTua',
    homepage: null,
    stargazers_count: 1,
    language: 'PHP & Blade',
    created_at: '2025-03-13T13:24:19Z',
    updated_at: '2025-04-23T12:36:40Z',
  },
];

export async function GET() {
  const GITHUB_USERNAME = 'yyogaandhika';
  
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=20`, {
      next: { revalidate: 3600 },
      headers: {
        'User-Agent': 'Portfolio-App',
      },
    });
    
    if (!res.ok) {
      throw new Error(`GitHub API returned ${res.status}`);
    }

    interface GitHubApiRepo {
      id: number;
      name: string;
      description: string | null;
      html_url: string;
      homepage: string | null;
      stargazers_count: number;
      language: string | null;
      created_at: string;
      updated_at: string;
      fork: boolean;
    }

    const data: GitHubApiRepo[] = await res.json();
    
    const filteredData: GitHubRepo[] = data
      .filter((repo) => !repo.fork && repo.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase())
      .map((repo) => {
        const repoKey = repo.name.toLowerCase();
        const meta =
          repoMetadata[repoKey] ||
          Object.entries(repoMetadata).find(([key]) => repoKey.includes(key))?.[1];

        const description =
          repo.description && repo.description.trim() !== ''
            ? repo.description
            : meta?.description || 'Open-source software engineering repository.';

        const language = meta?.language || repo.language || 'Code';
        const homepage =
          (repo.homepage && repo.homepage.trim() !== '' ? repo.homepage : null) ||
          meta?.homepage ||
          null;

        return {
          id: repo.id,
          name: repo.name,
          description,
          html_url: repo.html_url,
          homepage,
          stargazers_count: repo.stargazers_count,
          language,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
        };
      });

    // Ensure Web-Kominfo is always included even if not listed in public endpoint
    const hasKominfo = filteredData.some((repo) => repo.name.toLowerCase().includes('kominfo'));
    if (!hasKominfo) {
      filteredData.unshift(defaultRepos[0]);
    }

    return NextResponse.json(filteredData);
  } catch (error) {
    console.error('Error fetching GitHub repos, using fallback data:', error);
    return NextResponse.json(defaultRepos);
  }
}
