const { limitUrl } = require(`../limit-url`);

describe(`Test limit 1000 url per sitemap page`, () => {
    let url = [];
    let mockQueryRecords = {};
    let mockOptions = {};

    let result = {};
    afterEach(() => {
        let mappingKey = [];
        for (const key in result.queryRecords) {
            if (Object.hasOwnProperty.call(result.queryRecords, key)) {
                const element = result.queryRecords[key];
                mappingKey.push(key);
                expect(element.edges.length).toBeLessThan(1001);
            }
        }

        for (const key in result.options.mapping) {
            expect(mappingKey).toContain(key);
        }
    });

    it(`should working on 2000url with 1000url limit per page`, async () => {
        url = [];
        for (let index = 0; index < 2000; index++) {
            url.push({
                node: {
                    id: index,
                    slug: `page-${index}`,
                    url: `http://dummy.url/page-${index}`,
                },
            });
        }
        mockQueryRecords = {
            allSitePage: {
                edges: url,
            },
        };
        mockOptions = {
            mapping: { allSitePage: { sitemap: `allSitePage` } },
        };

        const { queryRecords, options } = limitUrl({
            queryRecords: mockQueryRecords,
            options: mockOptions,
        });
        result = { queryRecords, options };
    });

    it(`should working on 20000url with 1000url limit per page`, async () => {
        url = [];
        for (let index = 0; index < 20000; index++) {
            url.push({
                node: {
                    id: index,
                    slug: `page-${index}`,
                    url: `http://dummy.url/page-${index}`,
                },
            });
        }
        mockQueryRecords = {
            allSitePage: {
                edges: url,
            },
        };
        mockOptions = {
            mapping: { allSitePage: { sitemap: `allSitePage` } },
        };

        const { queryRecords, options } = limitUrl({
            queryRecords: mockQueryRecords,
            options: mockOptions,
        });
        result = { queryRecords, options };
    });
});

describe(`Test limitPerPage option value`, () => {
    let url = [];
    let mockQueryRecords = {};
    let mockOptions = {};

    beforeEach(() => {
        url = [];
        for (let index = 0; index < 2000; index++) {
            url.push({
                node: {
                    id: index,
                    slug: `page-${index}`,
                    url: `http://dummy.url/page-${index}`,
                },
            });
        }
        mockQueryRecords = {
            allSitePage: {
                edges: url,
            },
        };
        mockOptions = {
            mapping: { allSitePage: { sitemap: `allSitePage` } },
        };
    });

    let result = {};
    let expectLimit = 1000;
    afterEach(() => {
        let mappingKey = [];

        for (const key in result.queryRecords) {
            if (Object.hasOwnProperty.call(result.queryRecords, key)) {
                const element = result.queryRecords[key];
                mappingKey.push(key);
                expect(element.edges.length).toBeLessThan(expectLimit + 1);
            }
        }

        for (const key in result.options.mapping) {
            expect(mappingKey).toContain(key);
        }
    });

    it(`should limit 500 url when limitPerPage is 500`, async () => {
        mockOptions.limitPerPage = 500;
        expectLimit = 500;

        const { queryRecords, options } = limitUrl({
            queryRecords: mockQueryRecords,
            options: mockOptions,
        });

        result = { queryRecords, options };
    });

    it(`should limit 1000 url when limitPerPage is negative number`, async () => {
        mockOptions.limitPerPage = -10;
        expectLimit = 1000;

        const { queryRecords, options } = limitUrl({
            queryRecords: mockQueryRecords,
            options: mockOptions,
        });
        result = { queryRecords, options };
    });

    it(`should limit 1000 url when limitPerPage is null`, async () => {
        mockOptions.limitPerPage = null;
        expectLimit = 1000;

        const { queryRecords, options } = limitUrl({
            queryRecords: mockQueryRecords,
            options: mockOptions,
        });

        result = { queryRecords, options };
    });
});
