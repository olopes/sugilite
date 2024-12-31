require "test_helper"

class LocalesControllerTest < ActionDispatch::IntegrationTest
  test "LocalesController::index should return all available locales" do
    # thread safety concerns?
    I18n.available_locales = [ :en, :de ]
    get locales_url
    assert_response :success
    assert @response.body == '["en","de"]'
  end
end
