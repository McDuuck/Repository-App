import React from 'react';
import { render } from '@testing-library/react-native'
import RepositoryListContainer from '../components/RepositoryListContainer';


describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {
        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };
        
        // Add your test code here
        const { getByTestId, getByText, getAllByText } = render(<RepositoryListContainer repositories={repositories} />);

        const firstRepoElement = getByTestId('repository-jaredpalmer/formik');
        expect(getByText('jaredpalmer/formik')).toBeDefined();
        expect(getByText('Build forms in React, without the tears')).toBeDefined();
        expect(getByText('TypeScript')).toBeDefined();
        expect(getByText('21.9k')).toBeDefined();
        expect(getByText('1.6k')).toBeDefined();
        expect(getByText('88')).toBeDefined();
        expect(getByText('async-library/react-async')).toBeDefined();
        expect(getByText('Flexible promise-based React data loader')).toBeDefined();
        expect(getByText('JavaScript')).toBeDefined();
        expect(getByText('1.8k')).toBeDefined();
        expect(getByText('69')).toBeDefined();
        expect(getByText('72')).toBeDefined();
        const countOf3 = getAllByText('3');
        expect(countOf3).toHaveLength(2);
        

        // expect(getByText('jaredpalmer/formik')).toBeDefined();
      });
    });
  });