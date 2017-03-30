angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $filter, $http) {
    $scope.app = "Lista telefonica";
    $scope.contatos = [];
    $scope.operadoras = [];

    var carregarContatos = function () {
        $http.get("http://localhost:3412/contatos").then((data) => {
            $scope.contatos = data.data;
        }, (error) => {
            $scope.message = "Ocorreu um erro! Error message: " + error.data;
        });
    };

    var carregarOperadoras = function () {
        $http.get("http://localhost:3412/operadoras").then((data) => {
            $scope.operadoras = data.data;
        });
    };

    $scope.adicionarContato = function (contato) {
        // $scope.contatos.push({nome: $scope.nome, telefone: $scope.telefone}); evitar ler scope no controller
        // $scope.contatos.push({nome: nome, telefone: telefone}) com nome e telefone passados por parametro
        // $scope.contatos.push(angular.copy(contato));
        contato.data = new Date();
        $http.post("http://localhost:3412/contatos", contato).then((data) => {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
    };
    $scope.apagarContatos = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
            if (!contato.selecionado) return contato;
        });
    };
    $scope.isContatoSelecionado = function (contatos) {
        return contatos.some(function (contato) {
            return contato.selecionado;
        });
    };
    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    carregarContatos();
    carregarOperadoras();
});