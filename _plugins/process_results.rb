# require 'pathname'

module Jekyll

  class ResultsGenerator < Generator
    safe true
    # priority :low

    def generate(site)
      # Jekyll.logger.info "\n--------------"
      # site.collections.each do |name, collection|
      # end

      testNames = getTestNames(site.collections["results"])

      # this is the root where we store tests
      tests = site.data["tests"]

      # get unique list of performance tests
      testNames.each do |d|
        test_key = String(d.basename)
        # Jekyll.logger.info "- #{test_key}"
        tests[test_key] = {}
        tests[test_key]["code"] = test_key # we must make sure key is string, or Liquid will screw up...
      end

      Jekyll.logger.info "--------"
      Jekyll.logger.info "tests: #{tests}"
      # for k in site.data["tests"].keys
      #   Jekyll.logger.info "- #{tests[k]}"
      # end

      tests_metadata = site.data["tests_metadata"]
      Jekyll.logger.info "tests_metadata: #{tests_metadata}"
      Jekyll.logger.info "--------"
    end

    ##
    # Extract distinct names of tests from raw results data.
    # @results is Jekyll collection where raw results are stored.
    # @return array of Pathnames each representing the root folder for individual distinct tests
    #
    def getTestNames(results)
      first_file = results.files.first.path
      path = Pathname.new(first_file).dirname

      while !(String(path).end_with? "results" || path.root?) do
        path = path.parent
      end
      return path.children
    end

  end

end