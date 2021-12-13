import header from '../components/header/header'

interface PageProps {
  title: string;
  content: string;
  lang: string;
  description: string;
}

const defaultDescription = 'TypeScript starter for Eleventy'

module.exports = ({
  title,
  content,
  lang = 'en',
  description = defaultDescription,
}: PageProps) => /*html*/`
  <!doctype html>
  <html lang="${lang}">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="${description}">
      <link rel="stylesheet" href="/assets/styles.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism.min.css" integrity="sha512-tN7Ec6zAFaVSG3TpNAKtk4DOHNpSwKHxxrsiw4GHKESGPs5njn/0sMCUMl2svV4wo4BK/rCP7juYz+zx+l6oeQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/plugins/toolbar/prism-toolbar.min.css" integrity="sha512-ycl7dIZ0VJ5535/dzskAMTwOI6OoTNZ3PeD+tfckvYqMmAzaEwQfJHqJTSqcV2iQeJnp5XxnFy5jKotibstp7A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <title>${title || 'Hello world'}</title>
    </head>
    <body>
      ${header}
      <main>
        ${content}
      </main>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js" integrity="sha512-hpZ5pDCF2bRCweL5WoA0/N1elet1KYL5mx3LP555Eg/0ZguaHawxNvEjF6O3rufAChs16HVNhEc6blF/rZoowQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/plugins/autoloader/prism-autoloader.min.js" integrity="sha512-sv0slik/5O0JIPdLBCR2A3XDg/1U3WuDEheZfI/DI5n8Yqc3h5kjrnr46FGBNiUAJF7rE4LHKwQ/SoSLRKAxEA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/plugins/toolbar/prism-toolbar.min.js" integrity="sha512-YrvgEHAi5/3o2OT+/vh1z19oJXk/Kk0qdVKbjEFl9VRmcLTaWRYzVziZCvoGpJ2TrnV7rB8pnJcz1ioVJjgw2A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js" integrity="sha512-pUNGXbOrc+Y3dm5z2ZN7JYQ/2Tq0jppMDOUsN4sQHVJ9AUQpaeERCUfYYBAnaRB9r8d4gtPKMWICNhm3tRr4Fg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        
      }
    </body>
  </html>
`
