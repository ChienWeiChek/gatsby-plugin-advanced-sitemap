const { limitUrl } = require(`../limit-url`);

describe(`Test limit 1000 url per sitemap page`, () => {
    it(` should working on 2000url with 1000url limit per page`, async () => {
        let url = [];
        for (let index = 0; index < 2000; index++) {
            url.push({
                node: {
                    id: index,
                    slug: `page-${index}`,
                    url: `http://dummy.url/page-${index}`,
                },
            });
        }
        const mockQueryRecords = {
            allSitePage: {
                edges: url,
            },
        };
        const mockOptions = {
            mapping: { allSitePage: { sitemap: `allSitePage` } },
        };

        const { queryRecords, options } = limitUrl({
            queryRecords: mockQueryRecords,
            options: mockOptions,
        });

        let mappingKey = [];
        for (const key in queryRecords) {
            if (Object.hasOwnProperty.call(queryRecords, key)) {
                const element = queryRecords[key];
                mappingKey.push(key);
                expect(element.edges.length).toBeLessThan(1001);
            }
        }

        for (const key in options.mapping) {
            expect(mappingKey).toContain(key);
        }
    });

    it(` should working on 2000url with 500url limit per page`, async () => {
        let url = [];
        for (let index = 0; index < 2000; index++) {
            url.push({
                node: {
                    id: index,
                    slug: `page-${index}`,
                    url: `http://dummy.url/page-${index}`,
                },
            });
        }
        const mockQueryRecords = {
            allSitePage: {
                edges: url,
            },
        };
        const mockOptions = {
            mapping: { allSitePage: { sitemap: `allSitePage` } },
            limitPerPage: 500,
        };

        const { queryRecords, options } = limitUrl({
            queryRecords: mockQueryRecords,
            options: mockOptions,
        });

        let mappingKey = [];
        for (const key in queryRecords) {
            if (Object.hasOwnProperty.call(queryRecords, key)) {
                const element = queryRecords[key];
                mappingKey.push(key);
                expect(element.edges.length).toBeLessThan(1001);
            }
        }

        for (const key in options.mapping) {
            expect(mappingKey).toContain(key);
        }
    });
});
