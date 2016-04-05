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
    path = getCollectionPath(results)
    while !(String(path).end_with? Jekyll::RESULTS_URL_PATTERN || path.root?) do
      path = path.parent
    end
    return path.children
  end

  def getCollectionPath(collection)
    first_file = collection.files.first.path
    path = Pathname.new(first_file).dirname
  end

  ##
  # Dump content to file located at #{folder} using #{file_name}.json
  #
  def dumpFile(folder, file_name, content)
    final_path = "#{folder}#{File::SEPARATOR}#{file_name}.json"
    Jekyll.logger.info "Regenerating file #{final_path}"
    begin
      file = File.open(final_path, "w:UTF-8")
      file.write(content)
    rescue IOError => e
      #some error occur, dir not writable etc.
      Jekyll.logger.error "Something happened while writing to file #{final_path}"
    ensure
      file.close unless file.nil?
      Jekyll.logger.info "File #{final_path} has been flushed"
    end

  end

end