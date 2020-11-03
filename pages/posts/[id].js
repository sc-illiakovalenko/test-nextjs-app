const DynamicPost = ({ post }) => (
	<div>
		<h1>{post.title}</h1>
		<h2>{post.id}</h2>
	</div>
)

export default DynamicPost;

export async function getStaticPaths() {
	const getPosts = new Promise((res, rej) => {
		setTimeout(() => {
			res([
				{ id: 'x1' },
				{ id: 'y1' },
				{ id: '23' },
				{ id: '44' }
			])
		}, 1000)
	})

	const posts = await getPosts;

	const paths = posts.map(post => `/posts/${post.id}`);

	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({ params }) {
	const getPost = id => new Promise((res, rej) => {
		setTimeout(() => {
			res({
				id,
				title: 'CustomTitle with id:' + id
			})
		}, 1000)
	})

	const post = await getPost(params.id)

	return {
		props: {
			post
		}
	}
}
