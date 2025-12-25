import (
    "context"
    "fmt"
    "html/template"
    "log"
    "net/http"
    "golang.org/x/oauth2"
    "github.com/coreos/go-oidc"
    "github.com/golang-jwt/jwt/v4"
)

type ClaimsPage struct {
    AccessToken string
    Claims      jwt.MapClaims
}

var (
    clientID     = "623t790ctm0dhc7bcck3enpoi9"
    clientSecret = "l71fjdreurtu95nkn2ub0o57g1r2k3an1ka6ccka4hjs2n5tkd3"
    redirectURL  = "https://https://main.d2dls30vbzi549.amplifyapp.com/"
    issuerURL    = "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_aVjkWjMEc"
    provider     *oidc.Provider
    oauth2Config oauth2.Config
)

func init() {
    var err error
    // Initialize OIDC provider
    provider, err = oidc.NewProvider(context.Background(), issuerURL)
    if err != nil {
        log.Fatalf("Failed to create OIDC provider: %v", err)
    }

    // Set up OAuth2 config
    oauth2Config = oauth2.Config{
        ClientID:     clientID,
        ClientSecret: clientSecret,
        RedirectURL:  redirectURL,
        Endpoint:     provider.Endpoint(),
        Scopes:       []string{oidc.ScopeOpenID,"email","openid","phone"},
    }
}


