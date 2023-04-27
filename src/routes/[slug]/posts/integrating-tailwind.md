---
title: Integrating Tailwind CSS with your SvelteKit Project
description: Tailwind is a CSS framework that provides a managed design system for speedy UI development.
---

# {title}

Tailwind is a CSS framework that provides a managed design system for speedy UI development. It can be added with the `svelte-add` utility, or [installed manually (click to skip to this section)](/integrating-tailwind#install-tailwind-manually).

## Add Tailwind with `svelte-add`

`svelte-add` is a handy utility that makes it easy to include common packages and their configuration files in your project.

1. In the terminal, navigate to your SvelteKit project and run:

```bash
> npx svelte-add@latest tailwindcss
```

2. You may be asked if it's ok to proceed with the installation of `svelte-add`. Press `Enter` to confirm. The necessary packages and configuration files will be added to your project.

```bash
PostCSS
 ✅ successfully set up!
Create or find an existing issue at https://github.com/svelte-add/svelte-add/issues if this is wrong.

Tailwind CSS
 ✅ successfully set up!
Create or find an existing issue at https://github.com/svelte-add/svelte-add/issues if this is wrong.

Run npm install to install new dependencies, and then reload your IDE before starting your app.
```

3. Run `npm i` to install the following packages.

   - `tailwindcss`
   - [`postcss`](https://postcss.org/)
   - [`postcss-load-config`](https://github.com/postcss/postcss-load-config)
   - [`autoprefixer`](https://github.com/postcss/autoprefixer)
   - [`svelte-preprocess`](https://github.com/sveltejs/svelte-preprocess)

4. The adder may prompt you to reload your IDE as well. If you're using Visual Studio Code, open the command palette with `Ctrl+Shift+P` (or `F1`) and begin typing the phrase "Reload window". The command `Developer: Reload Window` should appear as the first result. Highlight the command (if it is not already) and press `Enter`. This method will allow you to reload the IDE while retaining the state of your file explorer and any open editors.

Congratulations! You've successfully integrated Tailwind CSS with your project. [Click here to learn how to set up Tailwind](/integrating-tailwind#tailwind-setup) or continue reading to learn how to install Tailwind manually.

> You can use `svelte-add` to install other common packages like mdsvex. Be sure to take a look at the [README](https://github.com/svelte-add/svelte-add#readme) before diving in.

<h2 id="install-tailwind-manually">Install Tailwind Manually</h2>

1. In a terminal, navigate to the root of your project and install the `tailwindcss` package and all dependencies.

```bash
> npm i -D tailwindcss postcss autoprefixer svelte-preprocess
```

2. Use Tailwind's official utility to add the necessary config files

```bash
> npx tailwindcss init tailwind.config.cjs -p
```

The configuration files `postcss.config.cjs` and `tailwind.config.cjs` can now be found in the root of your project.

<h2 id="tailwind-setup">Tailwind Setup</h2>

> **Heads up!** <br> If you opted to integrate Tailwind with `svelte-add`, configuration settings may vary a bit. This guide follows the [official Tailwind documentation](https://tailwindcss.com/docs/guides/sveltekit). Either will work as of the publish of this article, please consider the best option for your project.

1. In `svelte.config.js`, Tell SvelteKit to use PostCSS with `svelte-preprocess`.

```js
// svelte.config.js
import sveltePreprocess from 'svelte-preprocess';

const config = {
	// ...kit...

	preprocess: [
		sveltePreprocess({
			postcss: true;
		})
	]
}
```

2. In `tailwind.config.cjs`, locate the `content` array, and add the paths to project files where you want to use Tailwind.

```js
// tailwind.config.cjs
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}']

	// ...theme, plugins...
};
```

3. Create an `app.css` file and place it in the `src` directory. Include the following "at" rules to hook Tailwind into your project:

```css
/* src/app.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

> Your code editor may flash an "unknown 'at' rule" warning. If you're using VS Code, you can disable these warnings by searching in your settings for `css.lint.unknownAtRules` and setting the property to `ignore`. Please use caution as this will disable all warnings under this rule.

4. Within the `routes` directory, add a layout file and import `app.css`. Don't forget to include the `slot` tag so your pages are processed by SvelteKit.

```svelte
<!-- src/routes/+layout.svelte -->
<script>
	import '../app.css';
</script>

<slot />
```

## Using Tailwind in Your SvelteKit App

If everything is wired up correctly, you should see an immediate change to your content styles. On a fresh install, the welcome message and call to action will appear with their base styles reset. You're now ready to start adding utility classes!

```html
<!-- src/routes/+page.svelte -->
<h1 class="text-red-500">Welcome to SvelteKit</h1>
<p>
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the
	documentation
</p>
```

Tailwind CSS is a powerful tool, and there's so much more to learn that is outside the scope of this blog. To get the most out of Tailwind, please [give their official docs a read-through](https://tailwindcss.com/docs/utility-first). It's some of the best documentation I've encountered.

Happy learning!
