class ApplicationController < ActionController::Base
    include ExceptionHandler

    private

    def render_unsupported_version
      headers["API-Version-Supported"] = "false"
      respond_to do |format|
        format.json { render json: { message: "You requested an unsupported version (#{request_version})" }, status: :unprocessable_content }
      end
    end
end
