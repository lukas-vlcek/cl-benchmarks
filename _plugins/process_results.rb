require 'pathname'

module Jekyll

  class ResultsGenerator < Generator
    safe true
    # priority :low

    def generate(site)
      Jekyll.logger.info "\n--------------"
      # site.collections.each do |name, collection|
      # end

      results = site.collections["results"]
      first_file = results.files.first.path
      path = Pathname.new(first_file).dirname

      while !(String(path).end_with? "results" || path.root?) do
        # Jekyll.logger.info "- #{path}"
        path = path.parent
      end

      # get unique list of performance tests
      path.children.each do |d|
        Jekyll.logger.info "- #{d.basename}"
      end

    end

  end


end