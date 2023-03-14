---
title: Adding mdsvex to your SvelteKit Project
description: mdsvex lets you manage your content in Markdown without sacrificing the functionality of Svelte components.
---

# {title}

mdsvex lets you manage your content in Markdown without sacrificing the functionality of Svelte components. There are two ways to add it to your project:

1. Install with `svelte-add`
2. [Manual installation (click to skip to this section)](/adding-mdsvex#manual-installation)

## Install with `svelte-add`

The easiest way to get started with MDSvex is to install it with the `svelte-add` utility. This package will install all the necessary dependencies and configuration files so you can jump straight into working with mdsvex.

1. In the terminal, navigate to your SvelteKit project and run:

```bash
> npx svelte-add@latest mdsvex
```

2. You may be asked if it's ok to proceed with the installation of `svelte-add`. Press `Enter` to confirm. `svelte-add` will be installed and the necessary mdsvex dependencies and config files will be added to your project.

```bash
Need to install the following packages:
  svelte-add@2022.8.1-5.2
Ok to proceed? (y)
```

3. Once added, mdsvex will print a success message, then prompt you to install the newly added dependencies and reload your IDE.

```bash
mdsvex
 ✅ successfully set up!
Create or find an existing issue at https://github.com/svelte-add/svelte-add/issues if this is wrong.

Run npm install to install new dependencies, and then reload your IDE before starting your app.

> npm i
```

If you're using Visual Studio Code, open the command palette with `Ctrl+Shift+P` (or `F1`) and begin typing the phrase "Reload window". The command `Developer: Reload Window` should appear as the first result. Highlight the command (if it is not already) and press `Enter`. This method will allow you to reload the IDE while retaining the state of your file explorer and any open editors.

Congratulations! You've successfully added mdsvex to your project. [Click here to skip to configuration setup](/adding-mdsvex#configuration-setup) or continue reading to learn how to install mdsvex manually.

> You can use `svelte-add` to install other common packages like Tailwind CSS. Be sure to take a look at the [README](https://github.com/svelte-add/svelte-add#readme) before diving in.

<h2 id="manual-installation">Manual Installation</h2>

Manually installing MDSvex requires a few extra steps, but may be favorable to those who want full control over how it is added.

Install mdsvex as a dev dependency.

```bash
> npm i -D mdsvex
```

<h2 id="configuration-setup">Configuration Setup</h2>

_This section acts as a continuation from the previous one (Manual Installation), but will adhere to the config you get when using `svelte-add` as well. Regardless of which method you used, please feel free to follow along._

Once mdsvex has been installed, it must be added to `svelte.config.js` so SvelteKit knows how and where to use it.

1. Create a config file for mdsvex (`mdsvex.config.js`) and include it in the root of your project.

```bash
# Bash commands - work on Linux, macOS, and Git Bash for Windows
> touch mdsvex.config.js
```

2. In mdsvex.config.js, import `defineMDSveXConfig` from the `mdsvex` package. For more portability, you may alias the name as `defineConfig` like in the example below.

> Aliasing named imports with the `as` keyword.<br>Ex: `import { something as s } from 'package'`

3. Pass an object to `defineConfig`. This is where your mdsvex options will go.

4. Inside the object, add an `extensions` array and include the extensions SvelteKit should preprocess with mdsvex. MDSvex defaults to `.svx`, but these can be anything you like.

5. Export the defined config object.

6. The included `smartypants`, `remarkPlugins`, and `rehypePlugins` properties can help you customize the way mdsvex formats content and are completely optional. Please visit [the official mdsvex docs](https://mdsvex.pngwn.io/docs) for more on these.

```js
// mdsvex.config.js
import { defineMDSveXConfig as defineConfig } from 'mdsvex';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [],
	rehypePlugins: []
});

export default config;
```

7. In svelte.config.js, import the newly-created mdsvex config file and the mdsvex package.

8. Tell SvelteKit to use the extensions listed in `mdsvex.config.js` by spreading them into the `extensions` array.

> When the `extensions` property is explicitly defined, be sure to include `.svelte`, since this will override the default configuration.

9. Call `mdsvex` inside the `preprocess` array. Pass the imported `mdsvexConfig` through as an argument.

```js
// svelte.config.js
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...mdsvexConfig.extensions]

	kit: {
		adapter: adapter()
	}

  preprocess: [mdsvex(mdsvexConfig)]
};

export default config;
```

To avoid cluttering my project with one more config file, my personal preference is to include the mdsvex config directly in `svelte.config.js`:

```js
// svelte.config.js
import { mdsvex } from 'mdsvex';
// ...

const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [
		mdsvex({
			extensions: ['.md']
		})
		// ...
	]

	// ...
};

export default config;
```

This works just fine because I don't use any custom options and only want mdsvex to preprocess `.md` files.

## Usage

Now that mdsvex has been installed and configured, it's time to start using it! At its core, mdsvex turns Markdown files into Svelte components.

To illustrate this, a new SvelteKit project includes a homepage with a greeting:

```svelte
<!-- routes/+page.svelte -->
<h1>Welcome to SvelteKit</h1>
<p>
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
```

With mdsvex, you can include Markdown in this file by changing the extension to `.md` (or any of the extensions you defined in the mdsvex config earlier).

```
// routes/+page.md
---
heading: Welcome to SvelteKit
---

# {heading}

Visit [kit.svelte.dev](https://kit.svelte.dev) to read the documentation
```

This is a basic example, but hopefully it shows how powerful mdsvex can be. To see it in action, please stay tuned for an article on how I use mdsvex to power this blog.

Happy learning!
