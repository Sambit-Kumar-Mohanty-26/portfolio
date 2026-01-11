import { NextResponse } from 'next/server';

export async function GET() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username || !token) {
    return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 });
  }

  const query = `
    query($login: String!) {
      user(login: $login) {
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
          totalCount
        }
        followers {
          totalCount
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { login: username } }),
      next: { revalidate: 3600 },
    });

    const data = await res.json();
    const user = data.data.user;

    const starsRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const reposData = await starsRes.json();
    const totalStars = Array.isArray(reposData) 
      ? reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0) 
      : 0;

    return NextResponse.json({
      repos: user.repositories.totalCount,
      followers: user.followers.totalCount,
      contributions: user.contributionsCollection.contributionCalendar.totalContributions, 
      stars: totalStars,
    });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}