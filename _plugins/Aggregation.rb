class Aggregation

  def calculate(path)

    tet_name = path.basename
    content = {}
    content["code"] = tet_name

    Jekyll.logger.info "Generating data for #{tet_name} done"

    content
  end

end