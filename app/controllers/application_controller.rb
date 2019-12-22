class ApplicationController < ActionController::Base
    include Response
    include ExceptionHandler


    rescue_from VersionCake::UnsupportedVersionError, :with => :render_unsupported_version

    private
  
    def render_unsupported_version
      headers['API-Version-Supported'] = 'false'
      respond_to do |format|
        format.json { render json: {message: "You requested an unsupported version (#{request_version})"}, status: :unprocessable_entity }
      end
    end
  
end
