import styled from 'styled-components';
import { shade } from 'polished';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: none;
    color: #a8a8b3;
    display: flex;
    align-items: center;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#a8a8b3')};
    }
  }

  svg {
    margin-right: 4px;
  }
`;

export const RepositoryInfo = styled.div`
  margin-top: 50px;
  header {
    display: flex;
    align-items: center;

    img {
      height: 100px;
      width: 100px;
      border-radius: 50%;
    }
    div {
      margin-left: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      strong {
        font-size: 22px;
        color: #3d3d4d;
      }
      p {
        font-size: 16px;
        color: #737380;
        margin-top: 4px;
      }
    }
  }
  ul {
    list-style: none;
    margin-top: 20px;
    display: flex;

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }
      span {
        color: #6c6c80;
      }
      & + li {
        margin-left: 70px;
      }
    }
  }
`;
export const Issues = styled.div`
  margin-top: 80px;
  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;

    &:hover {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 16px;
    }

    div {
      margin: 0 20px;
      display: flex;
      flex: 1;
      flex-direction: column;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
      }
    }
    svg {
      margin-left: auto;
      color: #cbcdb6;
    }
  }
`;
