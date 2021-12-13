interface BlogPostProps {
  title: string;
  page: any;
  content: string;
}

exports.data = {
  layout: 'base.11ty.js'
}

exports.render = ({ title, page, content }: BlogPostProps) => /*html*/`
  <a href="/blog">Back</a>
  <article>
    <h1>${title}</h1>
    <div class="ak-post__meta">
      <time class="ak-post__meta__time">${page.date}</time>
    </div>
   
    ${content}
  </article>
`