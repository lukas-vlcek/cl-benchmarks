class Util

  def initialize(site)
    @site = site
  end

  ##
  # Return Jekyll collection
  #
  def getCollection(name)
    @site.collections[name]
  end

  ##
  # Return Jekyll data
  #
  def getData(name)
    @site.data[name]
  end

  ##
  # Extract distinct names of tests from raw results data.
  # @results is Jekyll collection where raw results are stored.
  # @return array of Pathnames each representing the root folder for individual distinct tests
  #
  def getTestNames(results)
    first_file = results.files.first.path
    path = Pathname.new(first_file).dirname

    while !(String(path).end_with? Jekyll::RESULTS_URL_PATTERN || path.root?) do
      path = path.parent
    end
    return path.children
  end

end