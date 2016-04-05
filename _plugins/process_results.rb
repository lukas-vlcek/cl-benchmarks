require 'json'

module Jekyll

  RESULTS_URL_PATTERN  = "results"
  AGGREGATIONS_PATTERN = "aggregations"

  class ResultsGenerator < Generator
    safe true
    # priority :low

    def generate(site)

      # Instantiate helper classes
      util = Util.new(site)
      aggregation = Aggregation.new

      # get collections
      results_col = util.getCollection RESULTS_URL_PATTERN
      aggregations_col = util.getCollection AGGREGATIONS_PATTERN
      aggregation_folder = util.getCollectionPath aggregations_col

      # get data
      # this is the object where we store found tests
      tests = util.getData "tests"
      tests_metadata = util.getData "tests_metadata"

      # get unique list of performance tests
      test_names = util.getTestNames(results_col)
      test_names.each do |t|
        test_name = String(t.basename)
        Jekyll.logger.info "-----------------"
        Jekyll.logger.info "Processing data for test #{test_name}"
        tests[test_name] = {}
        tests[test_name]["code"] = test_name # we must make sure key is string, or Liquid will screw up...
        content = JSON.pretty_generate(aggregation.calculate(t))
        Jekyll.logger.debug content
        util.dumpFile(aggregation_folder, test_name, content)
      end

    end

  end

end