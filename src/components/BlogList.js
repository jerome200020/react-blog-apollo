import React from 'react';
import Blog from './Blog';
import Header from './Header';
import { useQuery, gql } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { LINKS_PER_PAGE } from '../constants';

const BlogList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isNewPage = location.pathname.includes(
    'new'
  );
  const pageIndexParams = location.pathname.split(
    '/'
  );
  const page = parseInt(
    pageIndexParams[pageIndexParams.length - 1]
  );
  console.log(page);
  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;

  const getQueryVariables = (isNewPage, page) => {
    const start = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const limit = isNewPage ? LINKS_PER_PAGE : 100;
    const setting_language_slug = 'en';
    return { start, limit, setting_language_slug };
  };

  const getBlogsToRender = (isNewPage, data) => {
    if (isNewPage) {
      console.log(data.blogs)
      return data.blogs;
    }
  }

  const FEED_QUERY = gql`
  query Blogs($start: Int, $limit: Int, $setting_language_slug: String) {
    blogs(start:$start limit: $limit setting_language_slug:$setting_language_slug) {
        blog_id
        blog_description
        blog_title
        blog_media
    }
  }
`;

  const { data, loading, error, subscribeToMore } = useQuery(FEED_QUERY, {
    variables: getQueryVariables(isNewPage, page),
  });
  // console.log(data);

  return (
    <div>
      <Header />
      <div className='main-content-body'>
        {loading && <p>Loading...</p>}
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        {data && (
          <>
            {getBlogsToRender(isNewPage, data).map(
              (blog, index) => (
                <Blog
                  key={blog.blog_id}
                  blog={blog}
                  index={index + pageIndex}
                />
              )
            )}
            <div className="page-number">
              {page}/3
            </div>
            {isNewPage && (
              <div className="flex ml4 mv3 gray">
                <div
                  className="pointer mr2"
                  onClick={() => {
                    if (page > 1) {
                      navigate(`/new/${page - 1}`);
                    }
                  }}
                >
                  Previous
                </div>
                <div
                  className="pointer mr2"
                  onClick={() => {
                    if (
                      page < 3
                    ) {
                      navigate(`/new/${page + 1}`);
                    }
                  }}
                >
                  Next
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogList;