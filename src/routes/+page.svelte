<script lang="ts">
	const { data } = $props();
</script>

<h1>varlock demo</h1>

<ul>
	<li><strong>DATABASE_URL</strong><span>{data.DATABASE_URL}</span></li>
	<li><strong>GOOGLE_CLIENT_ID</strong><span>{data.GOOGLE_CLIENT_ID}</span></li>
	<li><strong>GOOGLE_CLIENT_SECRET</strong><span>{data.GOOGLE_CLIENT_SECRET}</span></li>
</ul>

<style>
	ul {
		font-size: 2rem;
	}

	strong {
		padding-right: 0.5rem;
	}
</style>
