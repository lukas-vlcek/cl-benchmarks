class Aggregation

  def calculate(path)

    test_name = path.basename
    content = {}
    content["code"] = test_name

    Jekyll.logger.info "Generating data for #{test_name} done"

    content
  end

end