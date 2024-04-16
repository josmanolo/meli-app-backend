const createApiError = (response, dataType) => {
  const err = new Error(response.message || `Error fetching ${dataType}`);
  err.status = response.status || 500;
  err.error = response.error || true;
  return err;
};

const fetchWithCache = async (ids, cache, fetchFunction, cacheKeyFunction, dataTransformFunction) => {
    const cachedData = [];
    const idsToFetch = [];
  
    ids.forEach(id => {
      const data = cache.get(id);
      if (data) {
        cachedData.push(data);
      } else {
        idsToFetch.push(id);
      }
    });
  
    if (idsToFetch.length === 0) {
      return cachedData;
    }
  
    const promises = idsToFetch.map(id => fetchFunction(id));
    const results = await Promise.all(promises);
  
    const newFetchedData = results.map(result => {
      const transformedData = dataTransformFunction(result);
      cache.set(cacheKeyFunction(transformedData), transformedData);
      return transformedData;
    });
  
    return [...cachedData, ...newFetchedData];
  }

  export { createApiError, fetchWithCache };