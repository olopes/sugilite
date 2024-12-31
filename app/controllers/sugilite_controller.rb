require "http_accept_language"

class SugiliteController < ApplicationController
  around_action :switch_locale

  def switch_locale(&action)
    locale = http_accept_language.compatible_language_from(I18n.available_locales)
    logger.debug "* Locale set to '#{locale}'"
    I18n.with_locale(locale, &action)
  end

  def index
    logger.debug "* Using locale '#{I18n.locale}'"
    @title = t("translation.title")
  end
end
