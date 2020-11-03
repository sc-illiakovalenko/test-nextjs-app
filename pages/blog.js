import { useRouter } from 'next/router';

function Blog({ posts }) {
	const router = useRouter();

	console.log('locale:', router.locale, router.locales, router.defaultLocale)

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

export default Blog

export async function getStaticProps({ locale }) {
	const getPosts = new Promise((res, rej) => {
		const mock = {
			'en-US': [
				{ id: 'x1', title: 'Stan-ENGLAND' },
				{ id: 'x2', title: 'Mike-ENGLAND' },
				{ id: 'x3', title: 'Gordon-ENGLAND' }
			],
			'fr': [
				{ id: 'x1', title: 'Stan-FRANCE' },
				{ id: 'x2', title: 'Mike-FRANCE' },
				{ id: 'x3', title: 'Gordon-FRANCE' }
			],
			'pl': [
				{ id: 'x1', title: 'Stan-POLAND' },
				{ id: 'x2', title: 'Mike-POLAND' },
				{ id: 'x3', title: 'Gordon-POLAND' }
			]
		}
		setTimeout(() => {
			res(mock[locale])
		}, 2000)
	})

	const posts = await getPosts;

	return {
		props: {
			posts
		}
	}
}