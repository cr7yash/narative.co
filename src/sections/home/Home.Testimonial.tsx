import React from 'react'
import styled from 'styled-components'
import { Link, graphql, useStaticQuery } from 'gatsby'
import SVG from 'react-inlinesvg'

import Section from '@components/Section'
import mediaqueries from '@styles/media'

const articlesQuotesQuery = graphql`
  query GetArticleQuotes {
    allContentfulArticleQuote {
      edges {
        node {
          article {
            slug
          }
          company
          largeIcon {
            file {
              url
            }
          }
          smallIcon {
            file {
              url
            }
          }
          quote {
            childMarkdownRemark {
              rawMarkdownBody
            }
          }
        }
      }
    }
  }
`

function HomeQuote() {
  const {
    allContentfulArticleQuote: { edges: quotes },
  } = useStaticQuery(articlesQuotesQuery)

  const quote = quotes[0].node
  const blockquote = quote.quote.childMarkdownRemark.rawMarkdownBody

  return (
    <Gradient>
      <Grid>
        <SVG src={quote.largeIcon.file.url} />
        <div>
          <Blockquote dangerouslySetInnerHTML={{ __html: `“${blockquote}”` }} />
          <StyledLink to={`/articles${quote.article.slug}`} data-a11y="false">
            <SVG src={quote.smallIcon.file.url} />
            More on {quote.company}
          </StyledLink>
          <StyledLink to="/articles" data-a11y="false">
            <BookIcon aria-hidden="true" data-a11y="false" />
            All articles
          </StyledLink>
        </div>
      </Grid>
    </Gradient>
  )
}

export default HomeQuote

const Gradient = styled.div`
  padding: 250px 0 150px;
  background: linear-gradient(180deg, #101216 0%, #191d23 100%);

  ${mediaqueries.tablet`
    padding: 50px 0 115px;
  `}
`

const Grid = styled(Section)`
  position: relative;
  display: grid;
  grid-template-columns: 132px 675px;
  grid-column-gap: 131px;

  ${mediaqueries.tablet`
    display: block;

    & > svg {
      width: 94.29px;
      height: 25px;
      margin-bottom:15px;
    }
  `}
`

const Blockquote = styled.blockquote`
  font-family: ${p => p.theme.fontfamily.serif};
  font-style: italic;
  font-size: 36px;
  color: #fafafa;
  margin-bottom: 40px;

  a {
    color: ${p => p.theme.colors.gold};

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  ${mediaqueries.tablet`
    font-size: 24px;
    margin-bottom: 45px;
  `}
`

const StyledLink = styled(Link)`
  position: relative;
  font-weight: 600;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.3);
  transition: color 0.3s var(--ease-out-quad);

  svg {
    margin-right: 13px;

    path {
      transition: fill-opacity 0.3s var(--ease-out-quad);
    }
  }

  &:not(:last-child) {
    margin-right: 60px;
  }

  &:hover {
    color: #fff;

    svg path {
      fill-opacity: 1;
    }
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -50%;
    width: 120%;
    height: 200%;
    border: 2px solid ${p => p.theme.colors.purple};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  ${mediaqueries.tablet`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
    padding: 15px 0;


    &:not(:last-child) {
      margin-right: 0;
      border-bottom: 1px solid rgba(255,255,255,0.25)};
    }
  `}
`

const HopperLogo = () => (
  <svg
    width="132"
    height="35"
    viewBox="0 0 132 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M39.8869 14.3C39.1868 13.7 39.0868 13.6 39.0868 13.4C39.0868 13.3 39.3869 10.4 39.1868 7.7C38.6868 1.4 35.7864 0 34.7862 0C34.6862 0 34.6862 0 34.5862 0.1C34.2861 0.5 34.2861 1.7 34.6862 3.9C34.8862 4.8 35.3863 6.4 35.8864 8.1C36.4864 10 37.0865 11.9 37.2866 13L37.3866 13.2L35.8864 13.7L35.7864 13.5C35.4863 12.7 34.9862 11.5 34.5862 10C33.7861 7.6 32.7859 4.6 31.9858 3.4C31.3857 2.4 30.0855 1.1 29.4855 1.1H29.3854C29.0854 1.2 28.7854 1.5 28.6853 2.1C28.2853 3.7 28.7854 6.7 30.8857 9.7C32.986 12.5 33.9861 14.1 34.0861 14.6L34.1861 14.8L34.0861 14.9C34.0861 14.9 33.686 15.4 33.086 15.4C32.7859 15.4 32.4859 15.3 32.2859 15C27.5852 10.4 22.7845 8.1 18.1839 8.1C15.3835 8.1 13.2832 8.9 12.283 9.4C11.883 9.6 11.5829 9.7 11.3829 9.7C11.1829 9.7 11.1829 9.6 11.0828 9.6C10.9828 9.5 10.9828 9.5 10.9828 9.3C10.9828 8 10.8828 6.5 10.5828 6.1C10.4828 6 10.3827 6 10.2827 6C8.48247 5.9 5.8821 7.2 4.98198 9.1C4.38189 10.2 4.58192 11.3 5.28202 12.4C5.98212 13.4 7.08228 13.4 7.78237 13.5C8.18243 13.5 8.48247 13.6 8.58249 13.8C8.6825 14.1 8.38246 14.2 8.18243 14.5C1.28145 19.9 -0.41879 24.5 0.0812809 26.1C0.181295 26.3 0.281309 26.5 0.481338 26.5C0.681366 26.5 0.78138 26.4 0.981409 26.3C6.38218 21.7 11.883 19.3 17.4838 19.3C27.6852 19.3 34.8862 26.9 36.8865 29.3C37.2866 29.8 37.7866 30.4 38.1867 31C39.2868 32.4 40.387 33.8 41.3871 34.5C42.1873 35 43.0874 35.1 43.4874 34.6C43.7875 34.3 43.8875 33.6 43.6875 32.7C43.2874 30.6 41.3871 28.3 40.087 27C38.9868 25.8 38.5867 25.3 38.6868 24.9C38.7868 24.8 38.7868 24.6 39.0868 24.6C42.2873 23.9 44.1875 22.8 44.4876 21.2C44.9877 18.6 41.3871 15.6 39.8869 14.3ZM71.8915 11.9C68.491 11.9 65.6906 14.5 65.6906 17.6C65.6906 18.3 65.8906 19 66.0907 19.7L66.1907 19.8L66.0907 19.9C65.3906 20.7 64.7905 21.2 64.1904 21.2C62.9902 21.2 62.9902 19.5 62.9902 17.4C62.8902 14.8 62.8902 11.9 60.5899 11.9C57.8895 11.9 55.7892 15.4 54.489 18.4L53.9889 19.4L54.189 16C54.389 12.5 54.489 9.2 54.489 5.9C54.489 2.9 54.389 1.2 54.289 0.8C54.189 0.6 53.5889 0.2 53.0888 0.2C52.7888 0.2 51.6886 0.7 51.4886 0.9C51.2886 1.3 51.0885 5.4 51.0885 9.3C51.0885 18.5 51.6886 22.4 51.7886 22.9V23C51.8886 23.2 52.3887 23.3 52.7888 23.3C53.1888 23.3 53.7889 23.2 53.8889 23L53.9889 22.8C55.0891 19.9 57.1894 15 58.9896 15C59.9898 15 59.9898 16.3 60.0898 17.8C60.1898 20.2 60.2898 23.2 63.5903 23.2C64.7905 23.2 65.9906 22.5 67.0908 21.2L67.2908 21L67.4909 21.2C68.691 22.4 70.3913 23.2 72.1915 23.2C75.692 23.2 78.4924 20.6 78.4924 17.5C78.0924 14.5 75.292 11.9 71.8915 11.9ZM71.8915 21.1C70.2913 21.1 69.0911 19.5 69.0911 17.6C69.0911 15.7 70.3913 14.1 71.8915 14.1C73.4917 14.1 74.7919 15.7 74.7919 17.6C74.7919 19.5 73.4917 21.1 71.8915 21.1ZM85.5934 11.9C84.3933 11.9 83.0931 12.3 82.0929 13L81.7929 13.2L81.6929 12.9C81.5928 12.5 81.5928 12.2 81.5928 12.2C81.4928 12 80.8928 11.9 80.4927 11.9C80.1927 11.9 79.5926 12 79.4926 12.2C79.3925 12.6 78.8925 17.1 78.8925 25.2V25.3C78.9925 25.4 78.9925 25.5 78.9925 25.9C79.0925 29.9 79.3925 33.8 79.5926 34.3C79.7926 34.5 80.8928 35 81.1928 35H81.2928C81.8929 35 82.393 34.6 82.393 34.4C82.393 34.3 82.493 33.9 82.493 31.3V29.3C82.493 27.9 82.393 27 82.393 25.8C82.293 25 82.2929 24.1 82.1929 22.7V22.4L82.493 22.6C83.4931 23.1 84.4933 23.4 85.4934 23.4C88.9939 23.4 91.7943 20.8 91.7943 17.7C91.8943 14.5 89.0939 11.9 85.5934 11.9ZM85.5934 21.1C82.9931 21.1 82.0929 19.3 82.0929 17.6C82.0929 15.5 83.3931 14.1 85.5934 14.1C87.1936 14.1 88.4938 15.7 88.4938 17.6C88.4938 19.5 87.1936 21.1 85.5934 21.1ZM99.3954 11.9C98.1952 11.9 96.895 12.3 95.8949 13L95.5948 13.2L95.4948 12.9C95.3948 12.5 95.3948 12.2 95.3948 12.2C95.2948 12 94.6947 11.9 94.2947 11.9C93.9946 11.9 93.3945 12 93.2945 12.2C93.1945 12.6 92.6944 17.1 92.6944 25.2V25.3C92.7944 25.4 92.7944 25.5 92.7944 25.9C92.8945 29.9 93.1945 33.8 93.3945 34.3C93.5946 34.5 94.6947 35 94.9948 35H95.0948C95.6948 35 96.1949 34.6 96.1949 34.4C96.1949 34.3 96.2949 33.9 96.2949 31.3V29.3C96.2949 27.9 96.1949 27 96.1949 25.8C96.0949 25 96.0949 24.1 95.9949 22.8V22.5L96.2949 22.7C97.2951 23.2 98.2952 23.5 99.2954 23.5C102.796 23.5 105.596 20.9 105.596 17.8C105.696 14.5 102.896 11.9 99.3954 11.9ZM99.3954 21.1C96.795 21.1 95.8949 19.3 95.8949 17.6C95.8949 15.5 97.1951 14.1 99.3954 14.1C100.996 14.1 102.296 15.7 102.296 17.6C102.296 19.5 100.996 21.1 99.3954 21.1ZM131.7 16.2C131.7 16.2 131.6 16.3 131.6 16.4C130.7 18.2 128.8 21.2 127.399 21.2C126.999 21.2 126.799 20.9 126.799 20.5C126.799 20 127.199 19 127.699 17.9C128.099 16.8 128.7 15.6 128.7 14.9C128.7 13.7 127.899 13.1 126.499 13.1C126.399 13.1 123.399 13.1 122.499 12.5L122.399 12.4V12.3C122.399 11.6 122.199 9.8 120.698 9.8C119.898 9.8 119.398 11 119.398 11.6C119.398 13.2 120.198 13.9 120.598 14.1C120.698 14.2 120.698 14.2 120.698 14.2L120.798 14.3L120.698 14.4C120.298 15.9 119.398 17.2 118.998 18C117.598 20 115.898 20.9 113.597 20.9C111.897 20.9 110.597 20 110.197 18.5L110.097 18.1L110.397 18.2C111.297 18.5 112.097 18.6 112.897 18.6C115.098 18.6 117.398 17.5 117.398 15.1C117.398 13.1 115.498 11.6 112.897 11.6C109.497 11.6 106.696 14.2 106.696 17.3C106.696 19.6 108.497 23 113.497 23C117.498 23 119.498 19.4 120.098 18.3L120.198 18.2C120.898 17 121.499 15.5 121.699 14.9L121.799 14.7L121.999 14.8C122.299 14.9 123.699 15.2 124.599 15.2C124.999 15.2 125.299 15.4 125.299 15.8C125.299 15.9 125.199 16 125.199 16.1L125.099 16.2L124.899 16.5C124.399 17.6 123.699 19.2 123.699 20.3C123.699 21.7 124.599 23.1 126.599 23.1C129.4 23.1 131.1 19.6 131.7 18.5L131.8 18.4C131.9 18.1 132 17.7 132 17.2C131.9 16.8 131.8 16.2 131.7 16.2ZM110.097 17.2C110.297 15.5 111.597 14.1 112.897 14.1C114.097 14.1 114.898 14.7 114.898 15.8C114.898 17.1 113.097 17.6 111.597 17.6C110.997 17.6 110.497 17.5 110.197 17.4L109.997 17.3L110.097 17.2Z"
      fill="#73737D"
    />
  </svg>
)

const HopperIcon = () => (
  <svg
    width="25"
    height="19"
    viewBox="0 0 25 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.6529 7.7787C21.2729 7.45232 21.2186 7.39792 21.2186 7.28913C21.2186 7.23473 21.3814 5.65723 21.2729 4.18853C21.0014 0.761551 19.4269 0 18.8839 0C18.8296 0 18.8296 0 18.7754 0.0543965C18.6125 0.271982 18.6125 0.92474 18.8296 2.12146C18.9382 2.61103 19.2097 3.48138 19.4812 4.40612C19.8069 5.43965 20.1327 6.47318 20.2413 7.07154L20.2956 7.18034L19.4812 7.45232L19.4269 7.34353C19.264 6.90835 18.9925 6.2556 18.7754 5.43965C18.341 4.13413 17.7981 2.50224 17.3637 1.84948C17.038 1.30552 16.3322 0.598361 16.0064 0.598361H15.9521C15.7892 0.652758 15.6263 0.815947 15.572 1.14233C15.3549 2.01267 15.6263 3.64456 16.7665 5.27646C17.9067 6.79956 18.4496 7.66991 18.5039 7.94189L18.5582 8.05068L18.5039 8.10508C18.5039 8.10508 18.2867 8.37706 17.961 8.37706C17.7981 8.37706 17.6352 8.32266 17.5266 8.15947C14.9748 5.65724 12.3687 4.40612 9.87123 4.40612C8.35102 4.40612 7.21086 4.84129 6.66792 5.11327C6.45075 5.22206 6.28787 5.27646 6.17928 5.27646C6.07069 5.27646 6.07069 5.22206 6.0164 5.22206C5.96211 5.16767 5.96211 5.16767 5.96211 5.05887C5.96211 4.35172 5.90781 3.53577 5.74493 3.31819C5.69064 3.26379 5.63635 3.26379 5.58205 3.26379C4.60477 3.20939 3.19314 3.91655 2.7045 4.95008C2.37874 5.54844 2.48733 6.1468 2.86738 6.74516C3.24744 7.28913 3.84466 7.28913 4.22472 7.34353C4.44189 7.34353 4.60477 7.39792 4.65907 7.50672C4.71336 7.6699 4.55048 7.7243 4.44189 7.88749C0.695645 10.8249 -0.227343 13.3271 0.0441239 14.1975C0.0984173 14.3063 0.152711 14.4151 0.261298 14.4151C0.369884 14.4151 0.424178 14.3607 0.532765 14.3063C3.46461 11.804 6.45075 10.4985 9.49118 10.4985C15.0291 10.4985 18.9382 14.6327 20.0241 15.9382C20.2413 16.2102 20.5127 16.5365 20.7299 16.8629C21.3271 17.6245 21.9244 18.386 22.4673 18.7668C22.9017 19.0388 23.3903 19.0932 23.6075 18.8212C23.7704 18.658 23.8246 18.2772 23.7161 17.7877C23.4989 16.6453 22.4673 15.3942 21.7615 14.6871C21.1643 14.0343 20.9471 13.7623 21.0014 13.5447C21.0557 13.4903 21.0557 13.3815 21.2186 13.3815C22.9559 13.0008 23.9875 12.4024 24.1504 11.5321C24.4219 10.1177 22.4673 8.48585 21.6529 7.7787Z"
      fill="white"
      fillOpacity="0.25"
    />
  </svg>
)

const BookIcon = () => (
  <svg
    width="17"
    height="18"
    viewBox="0 0 17 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.08049 17.6722C7.76458 17.6637 7.45759 17.5655 7.19547 17.389C5.39545 16.1889 3.19257 15.7528 1.0711 16.1765C0.806302 16.2334 0.530005 16.166 0.321224 15.9934C0.112443 15.8209 -0.00583261 15.5622 0.000221597 15.2914V1.56472C0.000221597 1.07593 0.39646 0.679692 0.885246 0.679692H3.38101C4.13236 0.678986 4.8811 0.768121 5.61128 0.945199C5.9164 1.03057 6.1528 1.27224 6.23143 1.57917C6.31005 1.88609 6.21896 2.21166 5.99247 2.43321C5.76597 2.65477 5.43849 2.73867 5.13336 2.6533C4.48691 2.50129 3.82363 2.43288 3.15976 2.44974H1.77027V14.2737C4.00492 14.0698 6.24252 14.6315 8.1159 15.8667C9.98927 14.6315 12.2269 14.0698 14.4615 14.2737V2.50284C12.5572 2.29141 10.6392 2.75836 9.04517 3.82153V12.4063C9.04517 12.8951 8.64893 13.2913 8.16015 13.2913C7.67136 13.2913 7.27512 12.8951 7.27512 12.4063V3.39672C7.27302 3.1197 7.40076 2.85768 7.62028 2.6887C9.8996 0.985765 12.7995 0.341351 15.5855 0.918648C15.9972 1.01136 16.2861 1.38182 16.2758 1.80367V15.3534C16.2819 15.6242 16.1636 15.8828 15.9548 16.0554C15.746 16.2279 15.4697 16.2954 15.2049 16.2384C13.0835 15.8148 10.8806 16.2509 9.08057 17.4509C8.77877 17.628 8.42883 17.7054 8.08049 17.6722Z"
      fill="white"
      fillOpacity="0.25"
    />
  </svg>
)

const HighlightLink = styled.a``
