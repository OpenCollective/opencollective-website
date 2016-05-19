import merge from 'lodash/object/merge';
import {
  GET_REPOS_FROM_GITHUB_SUCCESS,
  GET_CONTRIBUTORS_FROM_GITHUB_SUCCESS
} from '../constants/github';
import { HYDRATE } from '../constants/session';


export default function github(state={}, action={}) {
  switch (action.type) {

    case HYDRATE:
      if (action.data.connectedAccount) {
        return merge({}, state, {
          connectedAccount: action.data.connectedAccount,
        });
      }
      return state;

    case GET_REPOS_FROM_GITHUB_SUCCESS:
      const highStarCount = action.json.map(repo => {
        // TODO: change to 100 before pushing to production
        if (repo.stargazers_count >= 0) {
          return {
            title: repo.name,
            description: repo.description,
            stars: repo.stargazers_count
          };
        }
      });
      return merge({}, state, { repositories: highStarCount });

    case GET_CONTRIBUTORS_FROM_GITHUB_SUCCESS:
      const contributors = action.json.map(contributor => {
        return {
          name: contributor.login,
          avatar: contributor.avatar_url
        };
      });
      return merge({}, state, { contributors });

    default:
      return state;
  }
}