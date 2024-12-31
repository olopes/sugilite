require "i18n"
require "i18n_data"

class LocalesController < ApplicationController
  # GET /locales
  def index
    I18nData.languages()
    locales = I18n.available_locales
    entries = locales.to_h { |x| [ x, language_name(x) ] }
    render json: entries
  end

  # TODO Cache!!
  # GET /locales/:locale/:ns.json
  def show
    if params[:format] != "json"
      render json: { message: "Translation not found" }, status: :not_found
    else
      locale = params[:locale]
      namespace = "#{params[:ns]}"
      messages = {}
      I18n.with_locale(locale) do
        messages = I18n.t namespace, raise: true
      end
      render json: messages
    end
  rescue I18n::InvalidLocale, I18n::MissingTranslationData
    render json: { message: "Translation not found" }, status: :not_found
  end

  private
  def language_name(locale)
    parts = locale.to_s.upcase.split(/-/, 2)
    langname = I18nData.languages(parts[0])[parts[0]]
    if parts[1]
      country = I18nData.countries(parts[0])[parts[1]]
      "#{langname} (#{country})"
    else
      "#{langname}"
    end
  rescue
    "Missing #{locale}"
  end
end
