import React from 'react';
import logo from '../home-bg.jpg'

const Blog = (props) => {
  const { blog } = props;
  return (
    
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-7">
          <div className="post-preview">
            <div className='image-container'>
              <img src={logo} alt="Logo" height={350} width={600}></img>
            </div>
            <h2 className="post-title">{blog.blog_title}</h2>
            <h3 className="post-subtitle">{blog.blog_description}</h3>
          <p className="post-meta">{blog.blog_media}</p>
          </div>
          <hr className="my-4"/>
        </div>
      </div>
  );
};

export default Blog;