const limitUrl = ({ queryRecords, options }) => {
    const deepCopyRecord = { ...queryRecords };

    //make sure limitPerPage is integer and positive
    const numberDivide =
        Number.isInteger(options.limitPerPage) && options.limitPerPage > 0
            ? options.limitPerPage
            : 1000;

    for (const key in deepCopyRecord) {
        if (Object.hasOwnProperty.call(deepCopyRecord, key)) {
            const element = deepCopyRecord[key];
            //number of pages needed
            const divideTo = (element?.edges?.length || 0) / numberDivide;

            if (divideTo > 1) {
                //delete to original key and
                //map to new key
                delete options.mapping[key];
                delete queryRecords[key];
                for (let index = 0; index < divideTo; index++) {
                    options.mapping[`${key}-${index}`] = {
                        sitemap: `${key}-${index}`,
                    };
                    queryRecords[`${key}-${index}`] = {
                        edges: deepCopyRecord[key].edges.slice(
                            index * numberDivide,
                            (index + 1) * numberDivide
                        ),
                    };
                }
            }
        }
    }
    return { queryRecords: queryRecords, options: options };
};

export { limitUrl };
