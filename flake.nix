{
  inputs = {
    nixpkgs.url = "nixpkgs/nixpkgs-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils }:
    utils.lib.eachDefaultSystem (system:
      let pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShell = pkgs.mkShell { buildInputs = with pkgs; [ nodejs_22 ]; };
        #packages.site = pkgs.stdenv.mkDerivation {
        #  name = "site";
        #  src = pkgs.nix-gitignore.gitignoreSource [ ] ./.;
#
#          buildInputs = with pkgs; [ bun ];
#          phases = [ "unpackPhase" "buildPhase" ];
#          buildPhase = "zola build -o $out";
#        };
      });
}
