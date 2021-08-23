------------------ Tabela com os textos de alertas
CREATE TABLE UDI_TEXTO_PLANO_TERAPEUTICO
	(
	CD_EVOLUCAO               NUMBER (10) NOT NULL,
	DT_EVOLUCAO               DATE NOT NULL,
	NM_USUARIO                VARCHAR2 (15) NOT NULL,
	NR_ATENDIMENTO            NUMBER (10),
	DS_PLANO            	  LONG,
	CD_MEDICO                 VARCHAR2 (10)
	)

--------------------------------------------------------------------------

	------------ Criar Alerta TASY - Alerta de segurança
	SELECT TEXTO
FROM (
	SELECT 
	ds_plano as TEXTO,
	row_number() over (order by dt_evolucao desc) AS rn
	FROM UDI_TEXTO_PLANO_TERAPEUTICO where nr_atendimento= :nr_atendimento 
	) 
WHERE rn = 1

------------------------------------------------------
CREATE OR REPLACE procedure TASY.udi_inserir_evolucao_paciente(	nr_atendimento_p		number,
				ie_tipo_evolucao_p		varchar2,
				cd_pessoa_fisica_p		varchar2,
				nm_usuario_p		varchar2,
				ds_evolucao_p		varchar2,
				ds_plano_p            VARCHAR2,
				cd_medico_p		varchar2,
				ie_evolucao_clinica_p	VARCHAR2,
				CD_EVOLUCAO_P OUT NUMBER) is

cd_evolucao_w	number(10);
cd_evolucao_ww	number(10);
ie_nivel_atencao_w		varchar2(1);
begin


If (ds_evolucao_p is not null) then

	select	evolucao_paciente_seq.nextval
	into	cd_evolucao_w
	from	dual;

	Select	nvl(wheb_assist_pck.get_nivel_atencao_perfil, 'T')
	into	ie_nivel_atencao_w
	from 	dual;

	insert into evolucao_paciente (	nr_atendimento,
					cd_evolucao,
					dt_evolucao,
					ie_tipo_evolucao,
					cd_pessoa_fisica,
					nm_usuario,
					nm_usuario_nrec,
					ds_evolucao,
					cd_medico,
					dt_liberacao,
					ie_evolucao_clinica,
					ie_situacao,
					dt_atualizacao,
					ie_nivel_atencao)
				values (	nr_atendimento_p,
					cd_evolucao_w,
					sysdate,
					ie_tipo_evolucao_p,
					cd_pessoa_fisica_p,
					nm_usuario_p,
					nm_usuario_p,
					ds_evolucao_p,
					cd_medico_p,
					sysdate,
					nvl(ie_evolucao_clinica_p,'E'),
					'A',
					sysdate,
					ie_nivel_atencao_w) RETURNING CD_EVOLUCAO INTO CD_EVOLUCAO_P;
					
	
	
	
	
	INSERT INTO  UDI_TEXTO_PLANO_TERAPEUTICO (CD_EVOLUCAO,
					DT_EVOLUCAO,
					NM_USUARIO,
					NR_ATENDIMENTO,
					DS_PLANO,
					CD_MEDICO
					)
				values ( cd_evolucao_w,
				SYSDATE,
				nm_usuario_p,
				nr_atendimento_p,
				ds_plano_p,
				cd_medico_p				
				);
	
	commit;
	


end if;

end udi_inserir_evolucao_paciente;



------------------------------------------
DROP TABLE TASY.UDI_EVOLUCAO_RTF_HTML;

CREATE TABLE TASY.UDI_EVOLUCAO_RTF_HTML
	(
	CD_EVOLUCAO    NUMBER (10) NOT NULL,
	DS_TEXTO       CLOB,
	DT_ATUALIZACAO DATE NOT NULL,
	NM_USUARIO     VARCHAR2 (15) NOT NULL
	)
	LOGGING;    
CREATE INDEX UDIEVOTOHTML_I1 ON TASY.UDI_EVOLUCAO_RTF_HTML (DT_ATUALIZACAO);
CREATE INDEX UDIEVOTOHTML_I2 ON TASY.UDI_EVOLUCAO_RTF_HTML (DT_ATUALIZACAO, CD_EVOLUCAO);
CREATE INDEX UDIEVOTOHTML_I3 ON TASY.UDI_EVOLUCAO_RTF_HTML (CD_EVOLUCAO);

--------------------------------------------------------
CREATE OR REPLACE PROCEDURE TASY.udi_converte_rtf_html (	ds_sql_consulta_p		varchar2,
				ds_parametros_sql_p	varchar2,
				nm_usuario_p		in varchar2,
				nr_sequencia_p		in out varchar2) is



/*
 	-- Procedure customizado para atender necessidade do prontuario web udi --
	Foi efetuada a mudanca da implementacao do corpo deste objeto para que ele
	chame as respectivas funcoes, agora converte_rtf_html2 e converte_rtf_string
	devido a incidencias de situacoes das OSs 743949, 666255.
*/
cd_estabelecimento_w	number(10);
cd_perfil_w		number(10);
ie_formatacao_w		varchar2(1);

begin

--cd_perfil_w		:= somente_numero(wheb_usuario_pck.get_cd_perfil);
--cd_estabelecimento_w	:= wheb_usuario_pck.get_cd_estabelecimento;
--obter_param_usuario(0, 207, cd_perfil_w, nm_usuario_p, cd_estabelecimento_w, ie_formatacao_w);

if	(ds_parametros_sql_p IS NOT NULL) then
	converte_rtf_html2(ds_sql_consulta_p, ds_parametros_sql_p, nm_usuario_p, nr_sequencia_p);
end if;


insert into UDI_EVOLUCAO_RTF_HTML  (	
				CD_EVOLUCAO, 
				DS_TEXTO,
				DT_ATUALIZACAO, 
				NM_USUARIO					
				) SELECT 
					ds_parametros_sql_p,
					DS_TEXTO_CLOB, 
					DT_ATUALIZACAO, 
					NM_USUARIO 
				FROM TASY_CONVERSAO_RTF 
				WHERE NR_SEQUENCIA = nr_sequencia_p;

COMMIT;

end udi_converte_rtf_html;





-------------- Rotina para obter html das avaliações----------------------

CREATE TABLE TASY.UDI_HTML_AVALICAO
	(
	NR_SEQ_AVALIACAO          NUMBER (10) NOT NULL,
	CD_PESSOA_FISICA          VARCHAR2 (10) NOT NULL,
	NR_ATENDIMENTO            NUMBER (10),
	CD_MEDICO                 VARCHAR2 (10),
	DT_AVALIACAO	   DATE NOT NULL,
	DS_TEXTO       	   CLOB,
	DT_ATUALIZACAO 	   DATE NOT NULL,
	NM_USUARIO     	   VARCHAR2 (15) NOT NULL
	)
	LOGGING;    
CREATE INDEX UDIHTMLAVALIACAO_I1 ON TASY.UDI_HTML_AVALICAO (DT_ATUALIZACAO);
CREATE INDEX UDIHTMLAVALIACAO_I2 ON TASY.UDI_HTML_AVALICAO (NR_ATENDIMENTO);
CREATE INDEX UDIHTMLAVALIACAO_I3 ON TASY.UDI_HTML_AVALICAO (CD_PESSOA_FISICA, NR_ATENDIMENTO);


begin
UDI_GERAR_HTML_AVALIACAO(,'JREIS');
END;

SELECT * FROM UDI_HTML_AVALICAO WHERE NR_ATENDIMENTO = 74657 ORDER BY DT_ATUALIZACAO DESC
--AND UPPER(NM_USUARIO) LIKE '%JREIS%'

DELETE FROM UDI_HTML_AVALICAO WHERE NR_ATENDIMENTO = 2744078 
--AND UPPER(NM_USUARIO) LIKE '%JREIS%'





CREATE OR REPLACE procedure UDI_GERAR_HTML_AVALIACAO(		nr_sequencia_p		number,
										    nm_usuario_p		Varchar2) is



nr_seq_item_w		number(10);
ds_item_w		varchar2(32000);
ds_resultado_w		varchar2(32000);
ds_conteudo_w		varchar2(32000);
ds_complemento_w		varchar2(32000);
ie_resultado_w		varchar2(10);
IE_EVOLUCAO_CLINICA_w	varchar2(15);
ie_gerar_evolucao_w	varchar2(10);
nr_atendimento_w		number(10);
cd_pessoa_fisica_w	varchar2(10);
cd_medico_w		varchar2(10);
dt_avaliacao_w		date;
ds_evolucao_w		varchar2(32000);
ie_tipo_evolucao_w		varchar2(10);
ds_fonte_w		varchar2(100);
ds_tam_fonte_w		varchar2(10);
nr_tam_fonte_w		number(5,0);
ds_cabecalho_w		varchar2(32000);
ds_rodape_w		 varchar2(32000);
ie_sem_resposta_w		varchar2(1) := 'N';
cd_dominio_w		number(10);
ds_titulo_w		varchar2(100);
ds_titulo_rft_w varchar2(255) := '';
ie_relev_resumo_alta_w varchar2(1);
nr_cirurgia_w		number(10);
nr_seq_pepo_w		number(10);
nr_seq_soap_w		number(10);
ds_Funcao_Nutricao_w 	varchar2(10);
cd_evolucao_r_w		number(10);



Cursor C01 is
select	c.nr_sequencia,
		nvl(ds_label_relat,c.ds_item) ds_item,
		c.IE_RESULTADO,
		nvl((select d.ds_resultado from med_item_avaliar_res d where d.nr_seq_item = c.nr_sequencia and obter_somente_numero(Aval(a.nr_sequencia,c.nr_sequencia)) = d.nr_Seq_res and c.cd_dominio is null),substr(Aval(a.nr_sequencia,c.nr_sequencia),1,4000)) ds_resultado,
		cd_dominio,
		c.ds_complemento ds_complemento
from	med_Avaliacao_paciente a,
		med_tipo_avaliacao b,
		med_item_avaliar c
where	b.nr_sequencia = c.nr_seq_tipo
and		nvl(c.ie_situacao, 'A') = 'A'
and		a.nr_seq_tipo_avaliacao = b.nr_sequencia
and		((ie_sem_resposta_w = 'N') or
		((c.ie_resultado in ('T','H')) and ( exists (select  1
													 from    med_item_avaliar f
													 where   f.nr_seq_superior = c.nr_sequencia
													 and	    substr(Aval(a.nr_sequencia,f.nr_sequencia),1,4000) is not null))) or
	(nvl((select d.ds_resultado from med_item_avaliar_res d where d.nr_seq_item = c.nr_sequencia and obter_somente_numero(Aval(a.nr_sequencia,c.nr_sequencia)) = d.nr_Seq_res and c.cd_dominio is null),substr(Aval(a.nr_sequencia,c.nr_sequencia),1,4000)) is not null))
and	((ie_sem_resposta_w = 'N') or
 	((c.ie_resultado in ('T','H')) and ( exists (	select  1
													from    med_item_avaliar f
													where   f.nr_seq_superior = c.nr_sequencia
													and	    substr(Aval(a.nr_sequencia,f.nr_sequencia),1,4000) <> 'N'))) or
	(nvl((select d.ds_resultado from med_item_avaliar_res d where d.nr_seq_item = c.nr_sequencia and obter_somente_numero(Aval(a.nr_sequencia,c.nr_sequencia)) = d.nr_Seq_res and c.cd_dominio is null),substr(Aval(a.nr_sequencia,c.nr_sequencia),1,4000)) <> 'N'))
and	a.nr_sequencia = nr_sequencia_p
order by c.nr_seq_apresent;



begin

select	max(ie_gerar_evolucao),
	max(IE_EVOLUCAO_CLINICA),
	max(cd_pessoa_fisica),
	max(nr_atendimento),
	max(cd_medico),
	max(dt_avaliacao),
	max(ds_tipo),
	max(nr_cirurgia),
	max(nr_seq_pepo),
	max(nr_seq_soap)
into	ie_gerar_evolucao_w,
	IE_EVOLUCAO_CLINICA_w,
	cd_pessoa_fisica_w,
	nr_atendimento_w,
	cd_medico_w,
	dt_avaliacao_w,
	ds_titulo_w,
	nr_cirurgia_w,
	nr_seq_pepo_w,
    nr_seq_soap_w
from	med_Avaliacao_paciente a,
	med_tipo_avaliacao b
where	b.nr_sequencia = a.nr_seq_tipo_avaliacao
and	a.nr_sequencia = nr_sequencia_p;


if	(1 = 1) then

	--Obter_Param_Usuario(281, 174, obter_perfil_ativo, nm_usuario_p, wheb_usuario_pck.get_cd_estabelecimento, ds_Funcao_Nutricao_w);


	/* select	nvl(max(ie_campos_preench_evol_aval),'N')
	into	ie_sem_resposta_w
	from	parametro_medico
	where	cd_estabelecimento = wheb_usuario_pck.get_cd_estabelecimento;   */

	open C01;
	loop
	fetch C01 into
		nr_seq_item_w,
		ds_item_w,
		ie_resultado_w,
		ds_resultado_w,
		cd_dominio_w,
		ds_complemento_w;
	exit when C01%notfound;
		begin
		ds_resultado_w := replace(ds_resultado_w,chr(13),'');
		ds_resultado_w := replace(ds_resultado_w,chr(10),'');

		if	(ie_resultado_w in ('X', 'T', 'H')) THEN --- CAMPOS DE TiTULO
			ds_conteudo_w	:= ds_conteudo_w || '<br><p><strong>' || '<span style="text-decoration:underline;">' || ds_item_w || '</span>' || '</strong>'|| '</p>';
			
			if	(trim(ds_complemento_w) is not null) AND  --- se existir complemento
				(ie_resultado_w in ('X')) then
				ds_conteudo_w	:= ds_conteudo_w || '<p><strong>'||'<span style="text-decoration:underline;">' ||ds_complemento_w|| '</span>' ||'</strong></p>';
			end if;
			
			
		elsif	(ie_resultado_w = 'B') THEN --- BOLEANO
		
			if	(ds_resultado_w	= 'S') OR --- SELECAO SIMPLES
				(ds_resultado_w	= '1') THEN --- ???
				ds_resultado_w	:= WHEB_MENSAGEM_PCK.get_texto(298977,null); --'Sim';
			else
				ds_resultado_w	:= WHEB_MENSAGEM_PCK.get_texto(298976,null); --'Não';
			end if;
			                                                
			IF (upper(trim(ds_item_w)) = 'SIM' AND upper(trim(ds_resultado_w)) = 'SIM' ) THEN 
				ds_conteudo_w := ds_conteudo_w || ds_item_w||'<br>';
			ELSIF (upper(trim(SEM_ACENTO(ds_item_w))) = 'NAO' AND upper(trim(ds_resultado_w)) = 'SIM' ) THEN 
				ds_conteudo_w := ds_conteudo_w || ds_item_w||'<br>';
			ELSIF ( upper(trim(sem_acento(ds_item_w))) = 'NAO' AND upper(trim(sem_acento(ds_resultado_w))) = 'NAO') THEN
				ds_conteudo_w := ds_conteudo_w ||'<br>';
			ELSIF ( upper(trim(sem_acento(ds_item_w))) = 'SIM' AND upper(trim(sem_acento(ds_resultado_w))) = 'NAO') THEN
				ds_conteudo_w := ds_conteudo_w ||'<br>';
		    ELSIF (upper(trim(ds_item_w)) = trim('N/A') AND upper(trim(sem_acento(ds_resultado_w))) = 'SIM') THEN 
		        ds_conteudo_w := ds_conteudo_w ||ds_item_w||'<br>';
		    ELSIF (upper(trim(ds_item_w)) = trim('N/A') AND upper(trim(sem_acento(ds_resultado_w))) = 'NAO') THEN 
		        	ds_conteudo_w := ds_conteudo_w ||'<br>';
		    ELSE                                   
				ds_conteudo_w := ds_conteudo_w ||'<p><strong>'||ds_item_w||' : '||'</strong>'||ds_resultado_w||'</p>';
			END IF;
		
		elsif	(ie_resultado_w = 'O') then
				if	(cd_dominio_w > 0) then
					select	max(ds_valor_dominio)
					into	ds_resultado_w
					from	med_valor_dominio
					where	nr_seq_dominio = cd_dominio_w
					and		vl_dominio = ds_resultado_w;

					ds_conteudo_w := ds_conteudo_w ||'<p> '||'<strong>'||ds_item_w||' : '||'</strong>'||ds_resultado_w||' </p><br>';
				end if;
				
		elsif (ie_resultado_w in ('V','C')) then
			ds_conteudo_w := ds_conteudo_w ||'<p> '||'<strong>'||ds_item_w||' : '||'</strong>'||ds_resultado_w|| ' ' || ds_complemento_w || ' </p><br>';
 		else
			ds_conteudo_w := ds_conteudo_w ||'<p> '||'<strong>'||ds_item_w||' : '||'</strong>'||ds_resultado_w||' </p><br>';
		end if;
		
		end;
	end loop;
	close C01;

	ds_titulo_rft_w := '<p><strong>'|| wheb_mensagem_pck.get_texto(326719)|| '</strong>'||ds_titulo_w || '</p> <br><br>';

	ds_evolucao_w	:=  ds_titulo_rft_w ||ds_conteudo_w;


	insert into UDI_HTML_AVALICAO	(	
					NR_SEQ_AVALIACAO,
					CD_PESSOA_FISICA,
					NR_ATENDIMENTO,
					CD_MEDICO ,
					DT_AVALIACAO,
					DS_TEXTO,
					DT_ATUALIZACAO,
					NM_USUARIO   
					)
			values	(	
					nr_sequencia_p,
					cd_pessoa_fisica_w,
					nr_atendimento_w,
					cd_medico_w,
					dt_avaliacao_w,
					ds_evolucao_w,
					sysdate,
					nm_usuario_p
					);

   
end if;



--if (nvl(wheb_usuario_pck.get_ie_commit, 'S') = 'S') then commit; end if;
COMMIT;

end UDI_GERAR_HTML_AVALIACAO;




-------------------------------------------

CREATE TABLE TASY.UDI_HTML_LAUDOS
	(
	NR_SEQ_LAUDO NUMBER (10) NOT NULL,
	CD_PESSOA_FISICA VARCHAR2 (10) NOT NULL,
	DS_TEXTO         CLOB,
	DT_ATUALIZACAO   DATE NOT NULL
	);
	
CREATE INDEX UDIHTMLLAUDO_I1 ON TASY.UDI_HTML_LAUDOS (DT_ATUALIZACAO);  
CREATE INDEX UDIHTMLLAUDO_I3 ON TASY.UDI_HTML_LAUDOS (CD_PESSOA_FISICA);


------------------------------------------------------
CREATE OR REPLACE PROCEDURE udi_laudo_rtf_html (nr_sequencia_laudo_p	varchar2, cd_pessoa_fisica_p VARCHAR2,
				nm_usuario_p VARCHAR2, nr_sequencia_p		in out varchar2) is

/*
 	-- Procedure customizado para atender necessidade do prontuario web udi --
	Foi efetuada a mudanca da implementacao do corpo deste objeto para que ele
	chame as respectivas funcoes, agora converte_rtf_html2 e converte_rtf_string
	devido a incidencias de situacoes das OSs 743949, 666255.
*/
cd_estabelecimento_w	number(10);
cd_perfil_w		number(10);
ie_formatacao_w		varchar2(1);

begin

--cd_perfil_w		:= somente_numero(wheb_usuario_pck.get_cd_perfil);
--cd_estabelecimento_w	:= wheb_usuario_pck.get_cd_estabelecimento;
--obter_param_usuario(0, 207, cd_perfil_w, nm_usuario_p, cd_estabelecimento_w, ie_formatacao_w);

if	(nr_sequencia_laudo_p IS NOT NULL) then
	converte_rtf_html2(
		'SELECT a.ds_laudo FROM LAUDO_PACIENTE A WHERE A.NR_SEQUENCIA = :NR_SEQUENCIA', 
		nr_sequencia_laudo_p, 
		nm_usuario_p, 
		nr_sequencia_p
		);
		
end if;


insert into UDI_HTML_LAUDOS  (	
				NR_SEQ_LAUDO, 
				CD_PESSOA_FISICA,
				DS_TEXTO,
				DT_ATUALIZACAO					
				) SELECT 
					nr_sequencia_laudo_p,
					cd_pessoa_fisica_p,
					DS_TEXTO_CLOB, 
					sysdate
				FROM TASY_CONVERSAO_RTF 
				WHERE NR_SEQUENCIA = nr_sequencia_p;

COMMIT;

end udi_laudo_rtf_html;










