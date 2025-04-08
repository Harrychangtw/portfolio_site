import { useRouter } from 'next/router';
import GalleryGrid from '../../components/GalleryGrid';

const GalleryPost = ({ post }) => {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gallery-post">
      <header className="gallery-header">
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <img src={post.imageUrl} alt={post.title} />
        <ul>
          <li>Date: {post.date}</li>
          <li>Camera: {post.camera}</li>
          <li>Lens: {post.lens}</li>
          <li>Location: {post.location}</li>
          <li>Tags: {post.tags.join(', ')}</li>
        </ul>
      </header>
      
      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </div>
      
      {post.gallery && post.gallery.length > 0 && (
        <section className="photo-gallery">
          <h2>Gallery</h2>
          <GalleryGrid images={post.gallery} />
        </section>
      )}
    </div>
  );
};

export default GalleryPost;